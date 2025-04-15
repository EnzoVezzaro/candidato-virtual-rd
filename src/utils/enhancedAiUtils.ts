
import candidateConfig from '@/config/candidate.config';
import { generateRAGResponse, initializeKnowledgeBase } from './ragUtils';
import { extendedConfig } from '@/config/extendedConfig';
import { aiProviderFactory } from '@/lib/providers/ai/factory';
import { AIProviderOptions } from '@/lib/providers/ai/types';

// Inicializar base de conocimiento al cargar el archivo
// initializeKnowledgeBase();

// Configurar el proveedor de IA basado en la configuración
let aiProvider = aiProviderFactory.createProvider(
  extendedConfig.ai.modelProvider.provider, 
  {
    model: extendedConfig.ai.modelProvider.model,
    apiKey: extendedConfig.ai.modelProvider.apiKey,
    apiUrl: extendedConfig.ai.modelProvider.apiUrl,
    embedModel: extendedConfig.ai.modelProvider.embedModel,
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
    // Agregar contexto del candidato a la consulta
    const context = `Eres ${extendedConfig.name}, un candidato con ideología ${extendedConfig.ideology}.
                     Responde a la siguiente pregunta desde tu perspectiva política.`;

    const fullPrompt = `${context}\n\nPregunta: ${query}`;

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
        const combinedPrompt = `Basado en la siguiente información: ${ragResponse}\n\nEres ${candidateConfig.name}, este es tu bio ${candidateConfig.shortBio}(no te presentes. todos saben quien eres)\n\nResponde a la pregunta: ${query}`;
        // Generate the AI response using the combined prompt
        return await aiProvider.generateText(combinedPrompt);
      }

      console.log('No relevant information found in knowledge base, falling back to base AI');
    }

    // Si RAG no está habilitado o no encontró información relevante,
    // usar el sistema base de generación de respuestas
    if (!aiProvider) {
      console.error('AI provider is not initialized.');
      return "Lo siento, ha ocurrido un error al procesar tu pregunta. Por favor, intenta nuevamente.";
    }
    return await aiProvider.generateText(query);
  } catch (error: unknown) {
    console.error('Error generating enhanced response:', error);
    return "Lo siento, ha ocurrido un error al procesar tu pregunta. Por favor, intenta nuevamente.";
  }
};

// Exportar la información de configuración del modelo para uso en la UI
export const getAIModelInfo = () => {
  return {
    modelName: extendedConfig.ai.modelProvider.model,
    providerName: extendedConfig.ai.modelProvider.provider,
    useRAG: true, // Por defecto habilitado
  };
};

// Generar embeddings para documentos usando el proveedor de IA configurado
export const generateEmbedding = async (text: string): Promise<number[]> => {
  try {
    return await aiProvider.generateEmbedding(text);
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
};
