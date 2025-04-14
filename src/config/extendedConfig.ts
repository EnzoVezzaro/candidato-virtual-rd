
import candidateConfig from './candidate.config';
import { 
  AIProvider,
  RAGProvider,
  VoiceProvider
} from '@/lib/providers/ai/types';

export type VoiceConfig = {
  enabled: boolean;
  input: {
    provider: 'openai' | 'google' | 'none';
    model: string;
  };
  output: {
    provider: 'elevenlabs' | 'google' | 'openai' | 'none';
    voiceId: string;
  };
};

export type AIModel = {
  provider: AIProvider;
  model: string;
  embedModel?: string;
  apiKey?: string;
  apiUrl?: string;
};

export type AIConfig = {
  modelProvider: AIModel;
  vectorProvider: {
    provider: string;
    path: string;
  };
  storageProvider: {
    provider: 'local' | 'supabase' | 's3';
    path: string;
  };
};

export type ExtendedConfig = {
  name: string;
  ideology: string;
  voice: VoiceConfig;
  ai: AIConfig;
};

// Configuración extendida basada en candidateConfig
export const extendedConfig: ExtendedConfig = {
  name: candidateConfig.name,
  ideology: candidateConfig.ideology,
  voice: {
    enabled: candidateConfig.voiceEnabled,
    input: {
      provider: candidateConfig.voiceConfig.input.provider,
      model: candidateConfig.voiceConfig.input.model,
    },
    output: {
      provider: candidateConfig.voiceConfig.output.provider,
      voiceId: candidateConfig.voiceConfig.output.voiceId,
    }
  },
  ai: {
    modelProvider: {
      provider: candidateConfig.aiConfig.provider,
      model: candidateConfig.aiConfig.model,
      embedModel: candidateConfig.embedConfig.model,
      apiKey: candidateConfig.aiConfig.apiKey,
    },
    vectorProvider: {
      provider: 'local:chromadb',
      path: './vector-db',
    },
    storageProvider: {
      provider: 'local',
      path: './rag/documents/',
    }
  }
};

export default extendedConfig;
