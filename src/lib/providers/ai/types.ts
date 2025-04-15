export type Ideology = 'progressive' | 'conservative' | 'liberal' | 'centrist' | 'socialist' | 'libertarian';

export type Category = 'health' | 'economy' | 'security' | 'education' | 'environment' | 'immigration' | 'technology' | 'foreign_policy';

export type Proposal = {
  id: string;
  title: string;
  description: string;
  category: Category;
  resources?: {
    title: string;
    url: string;
  }[];
};

export type SocialMedia = {
  platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok';
  url: string;
};

export type VoiceProvider = 'elevenlabs' | 'google' | 'openai' | 'hume' | 'aurora' | 'huggingface' | 'none';

export type VoiceOutputConfig = {
  provider: VoiceProvider;
  voiceId: string;
  apiKey?: string;
};

export type AIModel = 'gpt4o' | 'gpt4o-mini' | 'gpt4-turbo' | 'gpt3.5-turbo' | 'gemini-1.5-pro-latest' | 'gemini-2.0-flash' | 'claude' | 'mistral';

export type RAGProvider = 'supabase' | 'pinecone' | 'weaviate' | 'local';

import { OpenAIProvider } from './openai';
import { AnthropicProvider } from './anthropic';
import { GoogleProvider } from './google';
import { GroqProvider } from './groq';
import { XAIProvider } from './xai';
import { OpenRouterProvider } from './openrouter';

export type AIProvider =
  | OpenAIProvider
  | AnthropicProvider
  | GoogleProvider
  | GroqProvider
  | XAIProvider
  | OpenRouterProvider;

export interface AIProviderOptions {
  model: string;
  embedModel: string;
  apiKey?: string;
  apiUrl?: string;
  temperature?: number;
  maxTokens?: number;
}

export type AIProviderResponse = ReadableStream<Uint8Array>;

export interface AIProviderInterface {
  generateText(prompt: string, options?: Partial<AIProviderOptions>): Promise<AIProviderResponse>;
  generateEmbedding(text: string): Promise<number[]>;
  name: string;
}
