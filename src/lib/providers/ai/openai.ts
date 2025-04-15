
import candidateConfig from '@/config/candidate.config';
import { AIProvider, AIProviderOptions, AIProviderResponse } from './types';

export class OpenAIProvider implements AIProvider {
  private apiKey: string;
  private defaultModel: string;
  private apiUrl: string;
  
  name = 'openai';

  constructor(options: AIProviderOptions) {
    this.apiKey = options.apiKey || '';
    this.defaultModel = options.model || 'gpt-4o';
    this.apiUrl = options.apiUrl || 'https://api.openai.com/v1';
  }

  async generateText(prompt: string, options?: Partial<AIProviderOptions>): Promise<AIProviderResponse> {
    try {
      const model = options?.model || this.defaultModel;
      const temperature = options?.temperature || 0.7;
      const maxTokens = options?.maxTokens || 1000;

      const systemPrompt = {
        role: 'system',
        content: `
          Eres ${candidateConfig.name}.  
          Aquí está tu biografía: ${candidateConfig.longBio}  
          (No es necesario que te presentes; todos saben quién eres).  
          Esta es tu visión: ${candidateConfig.vision}  
          Esta es tu ideología: ${candidateConfig.ideology}  

          Responde a la siguiente pregunta desde tu perspectiva política.  
          Sé claro, directo y utiliza un lenguaje dominicano auténtico, pero siempre profesional.  
          Ofrece respuestas contextualizadas, tomando en cuenta la realidad nacional y tus propuestas como candidato.  
          A continuación, recibirás el mensaje del usuario:
        `
      };

      console.log('asking to open ai: ', systemPrompt, prompt);
      const response = await fetch(`${this.apiUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            systemPrompt,
            { role: 'user', content: prompt }
          ],
          temperature,
          max_tokens: maxTokens
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`OpenAI API error: ${error}`);
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
      console.error('Error generating text with OpenAI:', error);
      throw error;
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await fetch(`${this.apiUrl}/embeddings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'text-embedding-3-small',
          input: text
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`OpenAI Embedding API error: ${error}`);
      }

      const data = await response.json();
      return data.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding with OpenAI:', error);
      throw error;
    }
  }
}
