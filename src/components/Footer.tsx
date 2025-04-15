
import React from 'react';
import { Link } from 'react-router-dom';
import candidateConfig from '@/config/candidate.config';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  // Social media icon mapping
  const socialIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <Twitter size={20} />;
      case 'facebook':
        return <Facebook size={20} />;
      case 'instagram':
        return <Instagram size={20} />;
      case 'linkedin':
        return <Linkedin size={20} />;
      case 'youtube':
        return <Youtube size={20} />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800" style={{ zIndex: 9 }}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Candidate info */}
          <div>
            <h3 className="text-lg font-bold mb-4">{candidateConfig.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {candidateConfig.shortBio}
            </p>
            <div className="flex space-x-4 mt-4">
              {candidateConfig.socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-candidate-secondary dark:text-gray-400 dark:hover:text-candidate-accent transition-colors"
                >
                  {socialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-candidate-secondary dark:text-gray-400 dark:hover:text-candidate-accent">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/propuestas" className="text-gray-600 hover:text-candidate-secondary dark:text-gray-400 dark:hover:text-candidate-accent">
                  Propuestas
                </Link>
              </li>
              <li>
                <Link to="/preguntas-frecuentes" className="text-gray-600 hover:text-candidate-secondary dark:text-gray-400 dark:hover:text-candidate-accent">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link to="/biografia" className="text-gray-600 hover:text-candidate-secondary dark:text-gray-400 dark:hover:text-candidate-accent">
                  Biografía
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-600 hover:text-candidate-secondary dark:text-gray-400 dark:hover:text-candidate-accent">
                  Chat Virtual
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Para más información o para unirte a nuestra campaña:
            </p>
            <a
              href="mailto:contacto@anamariarodriguez.com"
              className="text-candidate-secondary hover:underline dark:text-candidate-accent"
            >
              contacto@anamariarodriguez.com
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} {candidateConfig.name}. Todos los derechos reservados.</p>
          <p className="mt-1">Esta aplicación fue generada con Candidato Inteligente.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
