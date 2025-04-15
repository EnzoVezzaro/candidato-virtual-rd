
import candidateConfig from '@/config/candidate.config';
import { generateRAGResponse, initializeKnowledgeBase } from './ragUtils';
import { aiProviderFactory } from '@/lib/providers/ai/factory';
import { AIProviderOptions } from '@/lib/providers/ai/types';

// Inicializar base de conocimiento al cargar el archivo
// initializeKnowledgeBase();

// Configurar el proveedor de IA basado en la configuración
let aiProvider = aiProviderFactory.createProvider(
  candidateConfig.aiConfig.provider, 
  {
    model: candidateConfig.aiConfig.model,
    apiKey: candidateConfig.aiConfig.apiKey,
    embedModel: candidateConfig.embedConfig.model,
  }
);

// Función para cambiar el proveedor de IA en tiempo de ejecución
export const setAIProvider = (
  provider: string,
  options: AIProviderOptions
) => {
  try {
    aiProvider = aiProviderFactory.createProvider(
      provider,
      options
    );
    return true;
  } catch (error) {
    console.error('Error changing AI provider:', error);
    return false;
  }
};

// Función directa para generar respuestas con el modelo de IA
export const generateAIResponse = async (query: string): Promise<string> => {
  try {
    const fullPrompt = `\n\nPregunta: ${query}`;

    // Llamar al proveedor de IA configurado
    const stream = await aiProvider.generateText(fullPrompt);

    if (!stream) {
      throw new Error("No se pudo obtener el stream de respuesta.");
    }

    const reader = stream.getReader();
    let accumulatedResponse = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      // Decode the Uint8Array to a string
      accumulatedResponse += new TextDecoder().decode(value);
    }

    return accumulatedResponse;
  } catch (error: unknown) {
    console.error('Error generating AI response:', error);
    return "Lo siento, ha ocurrido un error al procesar tu pregunta. Por favor, intenta nuevamente.";
  }
};

// Función mejorada para generar respuestas
export const generateEnhancedResponse = async (
  query: string,
  useRAG: boolean = true
): Promise<ReadableStream<Uint8Array> | string | null> => {
  try {
    // Si RAG está habilitado, usar la base de conocimiento
    if (useRAG) {
      console.log('Using RAG to generate response...');
      // Obtener respuesta de la base de conocimiento
      const ragResponse = await generateRAGResponse(query); 
      // Si tenemos una respuesta de RAG, la usamos
      if (ragResponse && ragResponse !== "Lo siento, no tengo información específica sobre esa consulta. ¿Puedo ayudarte con algo más?") {
        // Combine the query and the RAG response to create a new prompt
        const combinedPrompt = `Usa la siguiente información como contexto: ${ragResponse}

        Responde brevemente a la siguiente pregunta: ${query}.`;
        // console.log('sending prompt: ', combinedPrompt);
        // Generate the AI response using the combined prompt
        return await aiProvider.generateText(combinedPrompt); 
      }

      console.log('No relevant information found in knowledge base, falling back to base AI');
      const propuestasFiles = import.meta.glob('../rag/documents/propuestas.md', { query: '?raw', import: 'default' });
      const loadAllPropuestas = async () => {
        const contents = await Promise.all(
          Object.values(propuestasFiles).map(loader => loader())
        );
        return contents;
      };
      let allProposals = '';
      await loadAllPropuestas().then(contents => {
        console.log(contents);
        allProposals += contents;
      });
      console.log('propuestasFiles. ', allProposals);
      const promptNoFound = `<NOTIFICAR AL USUARIO>ESTO NO ES PARA EL USUARIO, ES PARA TI >>> Lamentablemente, ese tema específico no está contemplado dentro de tus propuestas actuales. Avisale al usuario que sin embargo, valoras mucho que haya mencionado este tema, ya que escuchar las inquietudes de la poblacion es clave para seguir construyendo un plan que realmente responda a las necesidades del país. Aunque no forma parte de tu agenda por el momento, tomo nota de su preocupación. Pero que puedes ayudar con las demas propuestas que tienes.<FIN NOTIFICA AL USUARIO>
        Este es tu programa de gobierno ${allProposals}
      `;
      return await aiProvider.generateText(promptNoFound); 
    }

    // Si RAG no está habilitado o no encontró información relevante,
    // usar el sistema base de generación de respuestas
    if (!aiProvider) {
      console.error('AI provider is not initialized.');
      return "Lo siento, ha ocurrido un error al procesar tu pregunta. Por favor, intenta nuevamente.";
    }
    console.log('generateText: ', query);
    return await aiProvider.generateText(query);
  } catch (error: unknown) {
    console.error('Error generating enhanced response:', error);
    return "Lo siento, ha ocurrido un error al procesar tu pregunta. Por favor, intenta nuevamente.";
  }
};

// Exportar la información de configuración del modelo para uso en la UI
export const getAIModelInfo = () => {
  return {
    modelName: candidateConfig.aiConfig.model,
    providerName: candidateConfig.aiConfig.provider,
    useRAG: true,
  };
};

// Generar embeddings para documentos usando el proveedor de IA configurado
export const generateEmbedding = async (text: string): Promise<number[]> => {
  try {
    // console.log('generateEmbedding: ', text);
    return await aiProvider.generateEmbedding(text);
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
};
