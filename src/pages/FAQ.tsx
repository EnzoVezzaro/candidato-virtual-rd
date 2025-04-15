
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchIcon, ArrowRightIcon, MessageSquareIcon } from 'lucide-react';
import knowledgeBase, { KnowledgeEntry } from '@/data/knowledgeBase';
import { Link } from 'react-router-dom';
import { Category } from '@/config/candidate.config';
import ChatDialog from '@/components/Chat/ChatDialog';

// Map for category labels
const categoryLabels: Record<Category, string> = {
  health: 'Salud',
  economy: 'Economía',
  security: 'Seguridad',
  education: 'Educación',
  environment: 'Medio Ambiente',
  immigration: 'Inmigración',
  technology: 'Tecnología',
  foreign_policy: 'Política Exterior',
};

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  useEffect(() => {
    // Scroll to the top of the page whenever the active category changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);
  const handleOpenChat = () => {
    setIsChatDialogOpen(true);
  };

  // Get all unique categories from knowledge base
  const categories = Array.from(
    new Set(knowledgeBase.flatMap(entry => entry.categories))
  ).sort() as Category[];

  // Filter knowledge base entries based on search query and category
  const filteredEntries = knowledgeBase.filter(entry => {
    const matchesSearch = searchQuery === '' || 
      entry.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || entry.categories.includes(activeCategory as Category);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Preguntas Frecuentes</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre mis propuestas y visión política.
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Buscar preguntas por palabra clave..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            className={activeCategory === 'all' 
              ? 'bg-candidate-secondary hover:bg-candidate-primary' 
              : 'hover:text-candidate-secondary'}
            onClick={() => setActiveCategory('all')}
          >
            Todas
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              className={activeCategory === category 
                ? 'bg-candidate-secondary hover:bg-candidate-primary' 
                : 'hover:text-candidate-secondary'}
              onClick={() => setActiveCategory(category)}
            >
              {categoryLabels[category]}
            </Button>
          ))}
        </div>

        {/* FAQ entries */}
        <div className="space-y-6">
          {filteredEntries.map((entry) => (
            <FAQItem key={entry.id} entry={entry} />
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No se encontraron preguntas que coincidan con tu búsqueda.
            </p>
            <Link to="/chat">
              <Button className="bg-candidate-secondary hover:bg-candidate-primary text-white">
                <MessageSquareIcon size={18} className="mr-2" />
                Hazme tu pregunta directamente
              </Button>
            </Link>
          </div>
        )}

        {/* CTA for chat */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            ¿No encontraste lo que buscabas? Puedes hacerme tu pregunta directamente.
          </p>
          <Button className="bg-candidate-secondary hover:bg-candidate-primary text-white" onClick={handleOpenChat}>
            Iniciar conversación <ArrowRightIcon size={16} className="ml-2" />
          </Button>
        </div>
        <ChatDialog 
          showTrigger={false} 
          open={isChatDialogOpen} 
          onOpenChange={setIsChatDialogOpen}
        />
      </div>
    </Layout>
  );
};

interface FAQItemProps {
  entry: KnowledgeEntry;
}

const FAQItem: React.FC<FAQItemProps> = ({ entry }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);
  const [initialChatMessage, setInitialChatMessage] = useState('');

  const handleOpenChat = () => {
    setInitialChatMessage(entry.question);
    setIsChatDialogOpen(true);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-0">
        <button
          className="w-full text-left p-6 focus:outline-none"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">{entry.question}</h3>
            <div>
              <svg
                className={`w-5 h-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </button>
        <div className={`px-6 pb-6 ${isExpanded ? 'block' : 'hidden'}`}>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
            <p className="text-gray-700 dark:text-gray-300">{entry.answer}</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {entry.categories.map((category) => (
                  <span 
                    key={category}
                    className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                  >
                    {categoryLabels[category]}
                  </span>
                ))}
              </div>
              <Button 
                variant="link" 
                className="text-candidate-secondary dark:text-candidate-accent p-0 h-auto"
                onClick={handleOpenChat}
              >
                Preguntar más <ArrowRightIcon size={14} className="ml-1" />
              </Button>
              <ChatDialog 
                showTrigger={false} 
                open={isChatDialogOpen} 
                onOpenChange={setIsChatDialogOpen}
                initialQuestion={initialChatMessage}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FAQ;

