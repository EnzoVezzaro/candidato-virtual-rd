
import { AIProvider, AIProviderOptions, AIProviderResponse } from './types';

export class OpenRouterProvider implements AIProvider {
  private apiKey: string;
  private defaultModel: string;
  private apiUrl: string;
  
  name = 'openrouter';

  constructor(options: AIProviderOptions) {
    this.apiKey = options.apiKey || '';
    this.defaultModel = options.model || 'openai/gpt-4o';
    this.apiUrl = options.apiUrl || 'https://openrouter.ai/api/v1';
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
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Candidato AI'
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
        throw new Error(`OpenRouter API error: ${error}`);
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
      console.error('Error generating text with OpenRouter:', error);
      throw error;
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await fetch(`${this.apiUrl}/embeddings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Candidato AI'
        },
        body: JSON.stringify({
          model: 'openai/text-embedding-3-small',
          input: text
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`OpenRouter Embedding API error: ${error}`);
      }

      const data = await response.json();
      return data.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding with OpenRouter:', error);
      throw error;
    }
  }
}
