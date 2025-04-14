
export interface ModelInfo {
  id: string;
  name: string;
  description: string;
  contextWindow: number;
  provider: string;
}

// Define los modelos disponibles para cada proveedor
export const models: Record<string, ModelInfo[]> = {
  openai: [
    {
      id: 'gpt-4o',
      name: 'GPT-4o',
      description: 'Modelo multimodal más avanzado de OpenAI',
      contextWindow: 128000,
      provider: 'openai'
    },
    {
      id: 'gpt-4o-mini',
      name: 'GPT-4o Mini',
      description: 'Versión más pequeña y rápida de GPT-4o',
      contextWindow: 128000,
      provider: 'openai'
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      description: 'Modelo equilibrado entre rendimiento y costo',
      contextWindow: 16000,
      provider: 'openai'
    },
    {
      id: 'text-embedding-3-small',
      name: 'Text Embedding 3 Small',
      description: 'Generación de embeddings eficiente',
      contextWindow: 8192,
      provider: 'openai'
    }
  ],
  anthropic: [
    {
      id: 'claude-3-opus-20240229',
      name: 'Claude 3 Opus',
      description: 'Modelo más potente de Anthropic',
      contextWindow: 200000,
      provider: 'anthropic'
    },
    {
      id: 'claude-3-sonnet-20240229',
      name: 'Claude 3 Sonnet',
      description: 'Equilibrio entre rendimiento y velocidad',
      contextWindow: 180000,
      provider: 'anthropic'
    },
    {
      id: 'claude-3-haiku-20240307',
      name: 'Claude 3 Haiku',
      description: 'Modelo rápido y económico',
      contextWindow: 150000,
      provider: 'anthropic'
    }
  ],
  google: [
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      description: 'Modelo avanzado de Google',
      contextWindow: 32000,
      provider: 'google'
    },
    {
      id: 'gemini-1.5-pro',
      name: 'Gemini 1.5 Pro',
      description: 'Modelo de última generación de Google',
      contextWindow: 128000,
      provider: 'google'
    },
    {
      id: 'embedding-001',
      name: 'Text Embedding',
      description: 'Modelo de embeddings de Google',
      contextWindow: 3072,
      provider: 'google'
    }
  ],
  groq: [
    {
      id: 'llama3-8b-8192',
      name: 'Llama 3 8B',
      description: 'Optimizado para velocidad',
      contextWindow: 8192,
      provider: 'groq'
    },
    {
      id: 'llama3-70b-8192',
      name: 'Llama 3 70B',
      description: 'Alto rendimiento con baja latencia',
      contextWindow: 8192,
      provider: 'groq'
    },
    {
      id: 'mixtral-8x7b-32768',
      name: 'Mixtral 8x7B',
      description: 'Modelo de alta capacidad',
      contextWindow: 32768,
      provider: 'groq'
    }
  ],
  xai: [
    {
      id: 'grok-1',
      name: 'Grok 1',
      description: 'Modelo principal de XAI',
      contextWindow: 8192,
      provider: 'xai'
    }
  ],
  openrouter: [
    {
      id: 'openai/gpt-4o',
      name: 'OpenAI GPT-4o',
      description: 'GPT-4o a través de OpenRouter',
      contextWindow: 128000,
      provider: 'openrouter'
    },
    {
      id: 'anthropic/claude-3-opus',
      name: 'Anthropic Claude 3 Opus',
      description: 'Claude 3 Opus a través de OpenRouter',
      contextWindow: 200000,
      provider: 'openrouter'
    },
    {
      id: 'meta-llama/llama-3-70b-instruct',
      name: 'Meta Llama 3 70B',
      description: 'Llama 3 70B a través de OpenRouter',
      contextWindow: 8192,
      provider: 'openrouter'
    },
    {
      id: 'google/gemini-pro',
      name: 'Google Gemini Pro',
      description: 'Gemini Pro a través de OpenRouter',
      contextWindow: 32000,
      provider: 'openrouter'
    }
  ]
};

// Obtener modelos disponibles para un proveedor específico
export const getModelsForProvider = (provider: string): ModelInfo[] => {
  return models[provider] || [];
};

// Obtener información de un modelo específico
export const getModelInfo = (provider: string, modelId: string): ModelInfo | undefined => {
  const providerModels = getModelsForProvider(provider);
  return providerModels.find(model => model.id === modelId);
};

// Obtener todos los modelos disponibles
export const getAllModels = (): ModelInfo[] => {
  return Object.values(models).flat();
};
