
import React from 'react';
import { Link } from 'react-router-dom';
import candidateConfig from '@/config/candidate.config';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatDialog from './Chat/ChatDialog'; // Corrected import path

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div 
              className="h-10 w-10 rounded-full bg-gradient-to-r from-candidate-primary to-candidate-secondary flex items-center justify-center text-white font-bold text-lg"
            >
              {candidateConfig.name.split(' ').map(name => name[0]).join('')}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg">{candidateConfig.name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Especialista Virtual</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-candidate-secondary dark:text-gray-300 dark:hover:text-candidate-accent font-medium">
              Inicio
            </Link>
            <Link to="/propuestas" className="text-gray-700 hover:text-candidate-secondary dark:text-gray-300 dark:hover:text-candidate-accent font-medium">
              Propuestas
            </Link>
            <Link to="/preguntas-frecuentes" className="text-gray-700 hover:text-candidate-secondary dark:text-gray-300 dark:hover:text-candidate-accent font-medium">
              Preguntas Frecuentes
            </Link>
            <Link to="/biografia" className="text-gray-700 hover:text-candidate-secondary dark:text-gray-300 dark:hover:text-candidate-accent font-medium">
              Biografía
            </Link>
          </nav>

          {/* Chat Dialog Trigger */}
          <div className="hidden md:block">
            <ChatDialog showTrigger={true} />
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-candidate-secondary dark:text-gray-300 dark:hover:text-candidate-accent font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="/propuestas" 
                className="text-gray-700 hover:text-candidate-secondary dark:text-gray-300 dark:hover:text-candidate-accent font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Propuestas
              </Link>
              <Link 
                to="/preguntas-frecuentes" 
                className="text-gray-700 hover:text-candidate-secondary dark:text-gray-300 dark:hover:text-candidate-accent font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Preguntas Frecuentes
              </Link>
              <Link 
                to="/biografia" 
                className="text-gray-700 hover:text-candidate-secondary dark:text-gray-300 dark:hover:text-candidate-accent font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Biografía
              </Link>
              {/* Chat Dialog Trigger for Mobile */}
              <div className="mt-2">
                <ChatDialog showTrigger={true} />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
