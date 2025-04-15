
import candidateConfig from '@/config/candidate.config';
import { generateEmbedding } from './enhancedAiUtils';
import { cosineSimilarity, embedMany } from 'ai';

// Tipos para el sistema RAG
export type Document = {
  id: string;
  content: string;
  embedding?: number[];
  metadata: {
    source: string;
    category?: string;
    topics?: string[];
  };
};

// Simulación de base de datos en memoria para documentos
export const documentStore: Document[] = [];

export const SYSTEM_PROMPT = `
    Eres ${candidateConfig.name}.  
    Aquí está tu biografía: ${candidateConfig.longBio}  
    (No es necesario que te presentes; todos saben quién eres).  
    Esta es tu visión: ${candidateConfig.vision}  
    Esta es tu ideología: ${candidateConfig.ideology}  
    Si encuentras un link a un PDF, pon el link al final de la conversacion (IMPORTANTE, abre nueva pestaña al click - usa un anchor asi >> <a target='_blank' href=<LINK> al link). Invita a ver el documento (pero solo si encuentras un link).

    Responde a la siguiente pregunta desde tu perspectiva política.  
    Hazlo con amabilidad y de manera cercana, como si estuvieras conversando directamente con un constituyente.
    Sé claro, directo pero siempre profesional.  
    Ofrece respuestas contextualizadas, tomando en cuenta la realidad nacional y tus propuestas como candidato.  
    A continuación, recibirás el mensaje del usuario:
  `

const LOCAL_STORAGE_KEY = 'cached_documents_v1';
// Función para cargar documentos (en producción, esto cargaría desde archivos)
export const loadDocuments = async (): Promise<Document[]> => {
  try {
    const documentFiles = import.meta.glob('../rag/documents/*.md', {
      query: '?raw',
      import: 'default',
    });

    const filePaths = Object.keys(documentFiles);

    // Verificar si hay cache y si la cantidad de documentos coincide
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as Document[];
      if (parsed.length === filePaths.length) {
        console.log('Loaded documents from localStorage');
        documentStore.push(...parsed);
        return parsed;
      } else {
        console.log('Document count changed, bypassing localStorage cache');
      }
    }
    
    const documents: Document[] = [];
    for (const filePath in documentFiles) {
      if (Object.prototype.hasOwnProperty.call(documentFiles, filePath)) {
        try {
          const content = await documentFiles[filePath]() as string;
          const id = filePath.split('/').pop()?.replace('.md', '') || 'unknown';
          // Extract category and topics from the markdown content
          const lines = content.split('\n');
          const category = lines.find(line => line.startsWith('#'))?.replace('#', '').trim();
          const topics = lines.filter(line => line.startsWith('##')).map(line => line.replace('##', '').trim());

          documents.push({
            id: id,
            content: content,
            metadata: {
              source: filePath,
              category: category || undefined,
              topics: topics.length > 0 ? topics : undefined,
            },
          });
        } catch (error) {
          console.error(`Error loading document from ${filePath}:`, error);
        }
      }
    }

    // En una implementación real, aquí generaríamos embeddings para cada documento
    for (const doc of documents) {
      try {
        // Generar embedding para el documento si es posible
        doc.embedding = await generateEmbedding(doc.content);
        
      } catch (error) {
        console.warn(`No se pudo generar embedding para ${doc.id}:`, error);
        // Continuar sin embedding
      }
    }

    // Guardar en localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(documents));
    console.log('Docs loaded and cached to localStorage: ', documents);
    documentStore.push(...documents);
    return documents;
  } catch (error) {
    console.error('Error loading documents:', error);
    return [];
  }
};

// Función para calcular similitud entre vectores (producto punto)
// Improved similarity calculation
const calculateSimilarity = (vec1: number[], vec2: number[]): number => {
  if (vec1.length !== vec2.length) return 0;
  
  let dotProduct = 0;
  let mag1 = 0;
  let mag2 = 0;
  
  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i];
    mag1 += vec1[i] * vec1[i];
    mag2 += vec2[i] * vec2[i];
  }
  
  // Prevent division by zero
  mag1 = Math.sqrt(mag1) || 1e-10;
  mag2 = Math.sqrt(mag2) || 1e-10;
  
  const similarity = dotProduct / (mag1 * mag2);
  
  // Ensure the result is within valid range [-1, 1]
  return Math.max(-1, Math.min(1, similarity));
};

// Función para buscar documentos relevantes usando embeddings o fallback a búsqueda simple
export const searchDocuments = async (query: string): Promise<Document[]> => {
  try {
    // Intentar generar embedding para la consulta
    let queryEmbedding: number[] | undefined;
    try {
      queryEmbedding = await generateEmbedding(query);
    } catch (error) {
      console.warn('No se pudo generar embedding para la consulta, usando búsqueda de texto:', error);
    }

    if (queryEmbedding) {
      // Buscar usando similitud de embeddings
      const docsWithEmbeddings = documentStore.filter(doc => doc.embedding);
      // console.log('docsWithEmbeddings:_', docsWithEmbeddings);
      if (docsWithEmbeddings.length > 0) {
        // Calcular similitud para cada documento con embedding
        const scoredDocs = docsWithEmbeddings.map(doc => ({
          doc,
          score: cosineSimilarity(queryEmbedding!, doc.embedding!)
        }));

        console.log('Similarity scores:', scoredDocs.map(item => ({
          id: item.doc.id,
          score: item.score,
          category: item.doc.metadata.category,
          query: query
        }))
          .sort((a, b) => b.score - a.score)
        );
        
        // Ordenar por similitud (mayor a menor)
        return scoredDocs
          .sort((a, b) => b.score - a.score)
          .filter(item => item.score > 0.55) // Umbral de similitud
          .map(item => item.doc);
      }
    }
    
    // Fallback a búsqueda simple de texto
    const normalizedQuery = query.toLowerCase();
    
    return documentStore.filter(doc => {
      const content = doc.content.toLowerCase();
      const metadata = doc.metadata;
      
      // Verificar si la consulta aparece en el contenido
      if (content.includes(normalizedQuery)) {
        return true;
      }
      
      // Verificar si la consulta coincide con la categoría o temas
      if (metadata.category && normalizedQuery.includes(metadata.category)) {
        return true;
      }
      
      if (metadata.topics && metadata.topics.some(topic => 
        normalizedQuery.includes(topic) || topic.includes(normalizedQuery)
      )) {
        return true;
      }
      
      return false;
    });
  } catch (error) {
    console.error('Error searching documents:', error);
    return [];
  }
};

// Función para generar respuesta basada en documentos relevantes
export const generateRAGResponse = async (query: string): Promise<string> => {
  // Buscar documentos relevantes
  const relevantDocs = await searchDocuments(query);
  
  if (relevantDocs.length === 0) {
    return "Lo siento, no tengo información específica sobre esa consulta. ¿Puedo ayudarte con algo más?";
  }
  
  // Combinar contenido de documentos relevantes
  const context = relevantDocs.map(doc => doc.content).join('\n\n');
  
  // En una implementación real, enviaríamos este contexto a un LLM
  // junto con la consulta para obtener una respuesta coherente
  // Por ahora, simplemente devolveremos el documento más relevante
  return context;
};

// Inicializar la base de conocimiento
export const initializeKnowledgeBase = async () => {
  console.log('Initializing RAG knowledge base...');
  await loadDocuments();
  console.log(`Loaded ${documentStore.length} documents into knowledge base`);
};
