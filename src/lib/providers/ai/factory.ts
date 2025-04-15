
import { OpenAIProvider } from './openai';
import { AnthropicProvider } from './anthropic';
import { GoogleProvider } from './google';
import { GroqProvider } from './groq';
import { XAIProvider } from './xai';
import { OpenRouterProvider } from './openrouter';
import { AIProvider, AIProviderOptions } from './types';
class AIProviderFactory {
  createProvider(provider: string | AIProvider, options: AIProviderOptions): AIProvider {
    switch (provider) {
      case 'openai':
        return new OpenAIProvider(options);
      case 'anthropic':
        return new AnthropicProvider(options);
      case 'google':
        return new GoogleProvider(options);
      case 'groq':
        return new GroqProvider(options);
      case 'xai':
        return new XAIProvider(options);
      case 'openrouter':
        return new OpenRouterProvider(options);
      case 'local':
        // For local provider, we could implement a mock provider or default to OpenAI
        return new OpenAIProvider(options);
      default:
        throw new Error(`Provider ${provider} is not supported`);
    }
  }
}

export const aiProviderFactory = new AIProviderFactory();
