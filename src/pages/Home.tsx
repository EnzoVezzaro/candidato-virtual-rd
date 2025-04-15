
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, MessageSquareIcon, FileTextIcon, UserIcon } from 'lucide-react';
import candidateConfig from '@/config/candidate.config';
import ProposalCard from '@/components/ProposalCard';
import ChatDialog from '@/components/Chat/ChatDialog'; // Import ChatDialog

const Home = () => {
  // Get featured proposals (first 3)
  const featuredProposals = candidateConfig.proposals.slice(0, 3);
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);
  const [initialChatMessage, setInitialChatMessage] = useState('');
  console.log('candidateConfig.profileImage: ', candidateConfig.profileImage);
  
  return (
    <Layout>
      {/* Hero section */}
      <section className="py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              <span className="block">Conoce a</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-candidate-primary to-candidate-secondary">
                {candidateConfig.name}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
              {candidateConfig.shortBio}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              {candidateConfig.vision}
            </p>
            <div className="flex flex-wrap gap-4">
              {/* Replace Link with ChatDialog */}
              <ChatDialog showTrigger={true} /> 
              <Link to="/propuestas">
                <Button variant="outline">
                  <FileTextIcon size={18} className="mr-2" />
                  Ver propuestas
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 justify-center flex">
            <img 
              src={candidateConfig.profileImage} 
              alt={candidateConfig.name}
              style={{ width: '100%', maxWidth: 414, maxHeight: 500, overflow: 'inherit', position: 'relative', bottom: 60 }}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured proposals */}
      <section className="py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Propuestas destacadas</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Conoce algunas de mis principales propuestas para construir un futuro mejor para todos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/propuestas">
            <Button variant="outline">
              Ver todas las propuestas
              <ArrowRightIcon size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Values section */}
      <section className="py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Mis valores</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Estos son los principios que guían mi visión política y mis propuestas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidateConfig.values.map((value, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-medium mb-3">{value}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="bg-gradient-to-r from-candidate-primary to-candidate-secondary rounded-xl p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-white text-3xl font-bold mb-4">Habla conmigo directamente</h2>
            <p className="mb-6 text-white">
              ¿Tienes preguntas sobre mis propuestas o quieres compartir tus inquietudes? Utiliza el asistente virtual para hablar conmigo en cualquier momento.
            </p>
            {/* Replace Link with ChatDialog */}
            <ChatDialog 
              showTrigger={true}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
