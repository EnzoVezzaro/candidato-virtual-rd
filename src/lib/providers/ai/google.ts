import candidateConfig from '@/config/candidate.config';
import { AIProvider, AIProviderOptions, AIProviderResponse } from './types';

export class GoogleProvider implements AIProvider {
  private apiKey: string;
  private defaultModel: string;
  private defaultEmdebModel: string;
  private apiUrl: string;

  name = 'google';

  constructor(options: AIProviderOptions) {
    this.apiKey = options.apiKey || '';
    this.defaultModel = options.model || 'gemini-2.0-flash';
    this.defaultEmdebModel = options.embedModel || 'gemini-embedding-exp-03-07';
    this.apiUrl = options.apiUrl || 'https://generativelanguage.googleapis.com/v1beta';
  }

  async generateText(prompt: string, options?: Partial<AIProviderOptions>): Promise<ReadableStream<Uint8Array>> {
    try {
      const model = options?.model || this.defaultModel;
      const temperature = options?.temperature || 0.7;
      const maxTokens = options?.maxTokens || 1000;
      const systemPrompt = `
        Eres ${candidateConfig.name}.  
        Aquí está tu biografía: ${candidateConfig.longBio}  
        (No es necesario que te presentes; todos saben quién eres).  
        Esta es tu visión: ${candidateConfig.vision}  
        Esta es tu ideología: ${candidateConfig.ideology}  
        Cuando encuestren un link a un PDF, pon el link al final y invita a ver el documento.

        Responde a la siguiente pregunta desde tu perspectiva política.  
        Sé claro, directo y utiliza un lenguaje dominicano auténtico, pero siempre profesional.  
        Ofrece respuestas contextualizadas, tomando en cuenta la realidad nacional y tus propuestas como candidato.  
        A continuación, recibirás el mensaje del usuario:
      `;

      console.log('asking to open ai: ', systemPrompt, prompt);

      const response = await fetch(`${this.apiUrl}/models/${this.defaultModel}:streamGenerateContent?alt=sse&key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                { text: systemPrompt },
                { text: prompt }
              ]
            }
          ],
          generationConfig: {
            temperature,
            maxOutputTokens: maxTokens
          }
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Google API error: ${error}`);
      }

      // Check if the response has a body and is a ReadableStream
      if (!response.body) {
        throw new Error('Response body is null');
      }

      const textDecoder = new TextDecoder();
      const reader = response.body.getReader();

      return new ReadableStream({
        async pull(controller) {
          let streamError: unknown;
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                controller.close();
                break;
              }

              const chunk = textDecoder.decode(value);
              const lines = chunk.split('\n').filter(line => line.trim() !== '');

              for (const line of lines) {
                if (line.startsWith('data:')) {
                  try {
                    const jsonData = JSON.parse(line.substring(5).trim());
                    // console.log('jsonData:', jsonData);
                    const text = jsonData?.candidates?.[0]?.content?.parts?.[0]?.text;
                    // console.log('Extracted text:', text);
                    if (text) {
                      // Convert the text to a Uint8Array
                      const encoder = new TextEncoder();
                      const encodedText = encoder.encode(text);
                      controller.enqueue(encodedText);
                    } else {
                      console.warn('No text found in jsonData:', jsonData);
                    }
                  } catch (jsonError) {
                    console.error('Error parsing JSON:', jsonError, 'Line:', line);
                    streamError = jsonError;
                    controller.error(streamError);
                    return;
                  }
                }
              }
            }
          } catch (e) {
            streamError = e;
            console.error('Stream error:', streamError);
            controller.error(streamError);
          }
        },
        cancel() {
          reader.cancel();
        }
      });
    } catch (error) {
      console.error('Error generating text with Google:', error);
      throw error;
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const model = 'embedding-001'; // Google's embedding model

      const response = await fetch(`${this.apiUrl}/models/${model}:embedContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: {
            parts: [{ text }]
          }
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Google Embedding API error: ${error}`);
      }

      const data = await response.json();
      return data.embedding.values;
    } catch (error) {
      console.error('Error generating embedding with Google:', error);
      throw error;
    }
  }
}
