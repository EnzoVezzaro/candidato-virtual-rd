
import { AIProvider, AIProviderOptions, AIProviderResponse } from './types';

export class XAIProvider implements AIProvider {
  private apiKey: string;
  private defaultModel: string;
  private apiUrl: string;
  
  name = 'xai';

  constructor(options: AIProviderOptions) {
    this.apiKey = options.apiKey || '';
    this.defaultModel = options.model || 'grok-1';
    this.apiUrl = 'https://api.xai.com/v1';
  }

  async generateText(prompt: string, options?: Partial<AIProviderOptions>): Promise<AIProviderResponse> {
    try {
      const model = options?.model || this.defaultModel;
      const temperature = options?.temperature || 0.7;
      const maxTokens = options?.maxTokens || 1000;

      const response = await fetch(`${this.apiUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
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
        throw new Error(`XAI API error: ${error}`);
      }

      const data = await response.json();
      return {
        text: data.choices[0].message.content,
        usage: {
          promptTokens: data.usage?.prompt_tokens,
          completionTokens: data.usage?.completion_tokens,
          totalTokens: data.usage?.total_tokens
        },
        modelUsed: model
      };
    } catch (error) {
      console.error('Error generating text with XAI:', error);
      throw error;
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    // XAI might not provide a dedicated embeddings API yet
    throw new Error('Embedding generation is not supported by XAI provider');
  }
}
