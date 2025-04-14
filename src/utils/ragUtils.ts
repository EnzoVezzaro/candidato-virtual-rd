
import { generateEmbedding } from './enhancedAiUtils';

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

// Función para cargar documentos (en producción, esto cargaría desde archivos)
export const loadDocuments = async (): Promise<Document[]> => {
  try {
    // Use import.meta.glob to load documents
    const documentFiles = import.meta.glob('../rag/documents/*.md', { query: '?raw', import: 'default' });
    
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
    console.log('docs: ', documents);
    
    documentStore.push(...documents);
    return documents;
  } catch (error) {
    console.error('Error loading documents:', error);
    return [];
  }
};

// Función para calcular similitud entre vectores (producto punto)
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
  
  mag1 = Math.sqrt(mag1);
  mag2 = Math.sqrt(mag2);
  
  return dotProduct / (mag1 * mag2);
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
      
      if (docsWithEmbeddings.length > 0) {
        // Calcular similitud para cada documento con embedding
        const scoredDocs = docsWithEmbeddings.map(doc => ({
          doc,
          score: calculateSimilarity(queryEmbedding!, doc.embedding!)
        }));
        
        // Ordenar por similitud (mayor a menor)
        return scoredDocs
          .sort((a, b) => b.score - a.score)
          .filter(item => item.score > 0.7) // Umbral de similitud
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
  return relevantDocs[0].content;
};

// Inicializar la base de conocimiento
export const initializeKnowledgeBase = async () => {
  console.log('Initializing RAG knowledge base...');
  await loadDocuments();
  console.log(`Loaded ${documentStore.length} documents into knowledge base`);
};
