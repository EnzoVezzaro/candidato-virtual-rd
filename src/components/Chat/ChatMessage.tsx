
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import candidateConfig from '@/config/candidate.config';
import ReactMarkdown from 'react-markdown';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

export type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

interface ChatMessageProps {
  message: MessageType;
  isLoading?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading = false }) => {
  const isAssistant = message.sender === 'assistant';
  const firstName = candidateConfig.name.split(' ')[0];

  return (
    <div 
      className={cn(
        "flex items-start mb-4 gap-3",
        isAssistant ? "justify-start" : "justify-end"
      )}
    >
      {isAssistant && (
        <Avatar className="h-10 w-10 border border-gray-200">
          <img 
            src={candidateConfig.profileImage} 
            alt={candidateConfig.name}
            className="h-full w-full object-cover"
          />
        </Avatar>
      )}

      <div 
        className={cn(
          "px-4 py-3 rounded-lg max-w-[80%] md:max-w-[70%]",
          isAssistant 
            ? "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-left" 
            : "bg-candidate-secondary text-white text-right"
        )}
      >
        <div className="flex flex-col">
          <span className="text-xs font-medium mb-1">
            {isAssistant ? firstName : 'Tú'}
          </span>
          <ReactMarkdown
            remarkPlugins={[remarkRehype]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              p: ({ node, ...props }) => (
                <p
                  {...props}
                  className={cn(
                    "text-sm md:text-base markdown-body",
                    isLoading && "animate-pulse"
                  )}
                />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
          <span className="text-xs opacity-70 mt-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {!isAssistant && (
        <Avatar className="h-10 w-10 bg-gray-200 dark:bg-gray-700">
          <span className="text-gray-600 dark:text-gray-300 font-medium">Tú</span>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
