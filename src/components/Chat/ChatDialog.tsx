import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle } from 'lucide-react';
import ChatInterface from './ChatInterface'; // Assuming ChatInterface is in the same directory
import useVoice from '@/hooks/useVoice'; // Import the useVoice hook

const ChatDialog: React.FC = () => {
  const { stopSpeaking } = useVoice(); // Get the stopSpeaking function

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      stopSpeaking(); // Call stopSpeaking when the dialog closes
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}> {/* Add onOpenChange handler */}
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <MessageCircle className="h-4 w-4" />
          <span className="sr-only">Abrir Chat</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="mt-4 sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Chat con el Candidato</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-hidden pb-200">
          <ChatInterface />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
