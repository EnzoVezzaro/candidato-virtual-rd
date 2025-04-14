
import React, { useEffect } from 'react';
import { initializeKnowledgeBase } from './utils/ragUtils';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Proposals from "./pages/Proposals";
import Biography from "./pages/Biography";
import FAQ from "./pages/FAQ";
// import Chat from "./pages/Chat"; // Removed chat page

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initializeKnowledgeBase();
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/propuestas" element={<Proposals />} />
            <Route path="/biografia" element={<Biography />} />
            <Route path="/preguntas-frecuentes" element={<FAQ />} />
            {/* <Route path="/chat" element={<Chat />} /> Removed chat page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
