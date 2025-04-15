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
import ChatInterface from './ChatInterface';
import useVoice from '@/hooks/useVoice';

// Add initialQuestion, open, and onOpenChange props
interface ChatDialogProps {
  initialQuestion?: string | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
}

const ChatDialog: React.FC<ChatDialogProps> = ({ initialQuestion, open, onOpenChange, showTrigger = false }) => {
  const { stopSpeaking } = useVoice();

  const handleOpenChangeInternal = (openState: boolean) => {
    if (!openState) {
      stopSpeaking();
    }
    // Call the external onOpenChange handler if provided
    if (onOpenChange) {
      onOpenChange(openState);
    }
  };

  // Use the passed 'open' and 'onOpenChange' if provided (controlled),
  // otherwise let the Dialog manage its own state (uncontrolled).
  const dialogProps = open !== undefined && onOpenChange !== undefined
    ? { open, onOpenChange: handleOpenChangeInternal }
    : { onOpenChange: handleOpenChangeInternal };

  return (
    <Dialog {...dialogProps}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <MessageCircle className="h-4 w-4" />
            <span className="sr-only">Abrir Chat</span>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="mt-4 sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            <h2 className="text-2xl font-bold text-navy-900">Chat con AI Ana Maria</h2>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-hidden pb-200">
          <ChatInterface initialQuestion={initialQuestion} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
