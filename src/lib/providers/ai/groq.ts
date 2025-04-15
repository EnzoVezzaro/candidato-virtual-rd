
import { AIProvider, AIProviderOptions, AIProviderResponse } from './types';

export class GroqProvider implements AIProvider {
  private apiKey: string;
  private defaultModel: string;
  private apiUrl: string;
  
  name = 'groq';

  constructor(options: AIProviderOptions) {
    this.apiKey = options.apiKey || '';
    this.defaultModel = options.model || 'llama3-8b-8192';
    this.apiUrl = 'https://api.groq.com/openai/v1';
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
        throw new Error(`Groq API error: ${error}`);
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
      console.error('Error generating text with Groq:', error);
      throw error;
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    // Groq doesn't currently offer a separate embeddings API
    // Redirect to OpenAI compatible endpoint or throw error
    throw new Error('Embedding generation is not supported by Groq provider');
  }
}
