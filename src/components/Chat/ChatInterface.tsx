
import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { X, Send, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import candidateConfig from '@/config/candidate.config';
import { generateEnhancedResponse } from '@/utils/enhancedAiUtils';
import useVoice from '@/hooks/useVoice';
import ChatMessage, { MessageType } from './ChatMessage';

const INITIAL_MESSAGES: MessageType[] = [
  {
    id: 'welcome',
    content: `Hola, soy ${candidateConfig.name}. Estoy aquí para responder tus preguntas sobre mis propuestas y visión para el futuro. ¿En qué puedo ayudarte hoy?`,
    sender: 'assistant',
    timestamp: new Date(),
  },
];

interface ChatInterfaceProps {
  initialQuestion?: string | null;
  onClose?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialQuestion, onClose }) => {
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
      id: uuidv4(),
      content: textToSend,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Create a streaming message
    const streamingMessage: MessageType = {
      id: 'streaming',
      content: '',
      sender: 'assistant',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, streamingMessage]);

    try {
      // Generate response
      const response = await generateEnhancedResponse(userMessage.content);

      if (typeof response === 'string') {
        // Handle non-streaming response (error message)
        const assistantMessage: MessageType = {
          id: uuidv4(),
          content: response,
          sender: 'assistant',
          timestamp: new Date(),
        };
        setMessages(prev => prev.filter(msg => msg.id !== 'streaming').concat(assistantMessage));
        if (voiceEnabled && !isSpeaking) {
          speak(response);
        }
      } else {
        // Handle streaming response
        const reader = response.getReader();
        let accumulatedResponse = "";

        const textDecoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          // Decode the Uint8Array to a string
          accumulatedResponse += textDecoder.decode(value);
          console.log('accumulatedResponse :', accumulatedResponse);
          
          // Update the streaming message with the accumulated response
          setMessages(prev => {
            const newMessages = [...prev];
            const streamingIndex = newMessages.findIndex(msg => msg.id === 'streaming');
            if (streamingIndex !== -1) {
              newMessages[streamingIndex] = { ...newMessages[streamingIndex], content: accumulatedResponse };
            }
            return newMessages;
          });
        }

        // Replace loading message with actual response
        const assistantMessage: MessageType = {
          id: uuidv4(),
          content: accumulatedResponse,
          sender: 'assistant',
          timestamp: new Date(),
        };

        setMessages(prev => prev.filter(msg => msg.id !== 'streaming').concat(assistantMessage));

        // If voice is enabled, speak the response
        if (voiceEnabled && !isSpeaking) {
          speak(accumulatedResponse);
        }
      }
    } catch (error) {
      console.error('Error generating response:', error);
      // Replace loading message with error message
      const errorMessage: MessageType = {
        id: uuidv4(),
        content: 'Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => prev.filter(msg => msg.id !== 'streaming').concat(errorMessage));
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
    <div className="flex flex-col h-full bg-gray-100 rounded-lg relative overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <p className="text-lg text-navy-800 mt-1">Por favor, asegúrate de activar tu micrófono.</p>
      </div>

      {/* Chat area */}
      <div className="flex-grow px-6 pb-6 overflow-y-auto">
        <div className="rounded-lg p-4 shadow-sm h-full">
          <div className="flex flex-col gap-3">
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                isLoading={message.id === 'loading'}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="px-6 pb-6 relative z-10">
        <div className={`flex items-end gap-2 bg-white rounded-lg p-2 shadow-sm px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700`} style={{ opacity: !input ? 0.5 : 1 }}>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="h-full min-h-[88px] resize-none focus-visible:ring-candidate-secondary"
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
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!input.trim() || isLoading}
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-4 text-left text-sm text-gray-600">
        <p>Esta conversación está siendo grabada con fines de<br />entrenamiento y monitoreo.</p>
        <p className="mt-2">
          <a href="#" className="text-blue-600">AI Ana Maria privacy policy.</a>
        </p>
      </div>

      {/* AI Character */}
      <div className="absolute right-0 bottom-0 w-1/3 h-2/3 pointer-events-none z-2">
        <div className="relative w-full h-full">
          <div className="absolute bottom-0 right-0 z-3">
            <img 
              src={candidateConfig.profileImage}
              alt="AI Ana Maria" 
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
