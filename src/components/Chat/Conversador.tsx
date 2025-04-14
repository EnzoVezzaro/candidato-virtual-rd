
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import candidateConfig from '@/config/candidate.config';
import extendedConfig from '@/config/extendedConfig';
import { generateEnhancedResponse, getAIModelInfo } from '@/utils/enhancedAiUtils';
import useVoice from '@/hooks/useVoice';
import ChatMessage, { MessageType } from './ChatMessage';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const INITIAL_MESSAGES: MessageType[] = [
  {
    id: 'welcome',
    content: `Hola, soy ${candidateConfig.name}. Estoy aquí para responder tus preguntas sobre mis propuestas y visión para el futuro. ¿En qué puedo ayudarte hoy?`,
    sender: 'assistant',
    timestamp: new Date(),
  },
];

interface ConversadorProps {
  initialQuestion?: string | null;
}

const Conversador: React.FC<ConversadorProps> = ({ initialQuestion }) => {
  const [messages, setMessages] = useState<MessageType[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [initialQuestionProcessed, setInitialQuestionProcessed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { 
    voiceEnabled, 
    isListening, 
    isSpeaking, 
    startListening, 
    stopListening, 
    speak 
  } = useVoice();
  
  const aiModelInfo = getAIModelInfo();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Process initial question if provided
  useEffect(() => {
    if (initialQuestion && !initialQuestionProcessed && !isLoading) {
      setInput(initialQuestion);
      setInitialQuestionProcessed(true);
      
      // Add a small delay to ensure UI updates
      setTimeout(() => {
        handleSendMessage(initialQuestion);
      }, 500);
    }
  }, [initialQuestion, initialQuestionProcessed, isLoading]);

  // Handle sending a message
  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    
    if (!textToSend || isLoading) return;

    const userMessage: MessageType = {
      id: crypto.randomUUID(),
      content: textToSend,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Placeholder for loading message
    const loadingMessage: MessageType = {
      id: 'loading',
      content: 'Estoy pensando...',
      sender: 'assistant',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      // Generate response using enhanced RAG system
      const responseText = await generateEnhancedResponse(userMessage.content);

      // Replace loading message with actual response
      const assistantMessage: MessageType = {
        id: crypto.randomUUID(),
        content: responseText,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => prev.filter(msg => msg.id !== 'loading').concat(assistantMessage));

      // If voice is enabled, speak the response
      if (voiceEnabled && !isSpeaking) {
        speak(responseText);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      // Replace loading message with error message
      const errorMessage: MessageType = {
        id: crypto.randomUUID(),
        content: 'Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => prev.filter(msg => msg.id !== 'loading').concat(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press for sending message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle voice input toggle
  const toggleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      // In a real implementation, you would capture the voice input
      // and set it as the input text once recognition is complete
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] max-h-[800px] bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Chat header with AI model info */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700">
          <img 
            src={candidateConfig.profileImage} 
            alt={candidateConfig.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{candidateConfig.name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {candidateConfig.shortBio}
          </p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Modelo: {aiModelInfo.modelName}</p>
              <p>Proveedor: {aiModelInfo.providerName}</p>
              <p>RAG: {aiModelInfo.useRAG ? 'Activado' : 'Desactivado'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Chat messages area */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            isLoading={message.id === 'loading'}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Escribe tu mensaje aquí..."
            className="min-h-[60px] resize-none focus-visible:ring-candidate-secondary"
            disabled={isLoading}
          />
          <div className="flex flex-col gap-2">
            {voiceEnabled && (
              <Button
                onClick={toggleVoiceInput}
                variant="outline"
                size="icon"
                className={isListening ? 'bg-red-100 hover:bg-red-200 text-red-500' : ''}
                disabled={isLoading || isSpeaking}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </Button>
            )}
            <Button
              onClick={() => handleSendMessage()}
              variant="default"
              size="icon"
              className="bg-candidate-secondary hover:bg-candidate-primary"
              disabled={!input.trim() || isLoading}
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
        {isLoading && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Generando respuesta con {aiModelInfo.useRAG ? 'RAG' : 'IA básica'}...
          </p>
        )}
      </div>
    </div>
  );
};

export default Conversador;
