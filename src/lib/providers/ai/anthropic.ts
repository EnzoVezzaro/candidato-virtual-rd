
import { AIProvider, AIProviderOptions, AIProviderResponse } from './types';

export class AnthropicProvider implements AIProvider {
  private apiKey: string;
  private defaultModel: string;
  private apiUrl: string;
  
  name = 'anthropic';

  constructor(options: AIProviderOptions) {
    this.apiKey = options.apiKey || '';
    this.defaultModel = options.model || 'claude-3-opus-20240229';
    this.apiUrl = 'https://api.anthropic.com/v1';
  }

  async generateText(prompt: string, options?: Partial<AIProviderOptions>): Promise<AIProviderResponse> {
    try {
      const model = options?.model || this.defaultModel;
      const temperature = options?.temperature || 0.7;
      const maxTokens = options?.maxTokens || 1000;

      const response = await fetch(`${this.apiUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          temperature,
          max_tokens: maxTokens
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Anthropic API error: ${error}`);
      }

      const data = await response.json();
      return {
        text: data.content[0].text,
        usage: {
          // Anthropic doesn't provide token usage in the same way as OpenAI
          // but we can estimate or leave undefined
          totalTokens: undefined
        },
        modelUsed: model
      };
    } catch (error) {
      console.error('Error generating text with Anthropic:', error);
      throw error;
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    // Anthropic doesn't officially provide embeddings API
    // For now, we'll throw an error suggesting to use another provider
    throw new Error('Embedding generation is not supported by Anthropic provider');
  }
}
