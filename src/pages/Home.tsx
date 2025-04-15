
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, MessageSquareIcon, FileTextIcon, UserIcon, MicIcon } from 'lucide-react';
import candidateConfig from '@/config/candidate.config';
import ProposalCard from '@/components/ProposalCard';
import ChatDialog from '@/components/Chat/ChatDialog'; // Import ChatDialog

const Home = () => {
  // Get featured proposals (first 3)
  const featuredProposals = candidateConfig.proposals.slice(0, 3);
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);
  const [initialChatMessage, setInitialChatMessage] = useState('');
  const handleOpenChat = () => {
    setIsChatDialogOpen(true);
  };
  
  return (
    <Layout>
      {/* Hero section */}
      <section className="md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              <span className="block">Conoce a</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-candidate-primary to-candidate-secondary">
                {candidateConfig.name}
              </span>
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              {candidateConfig.vision}
            </p>
            
            <p className="text-xl font-bold mb-2">
              Así luce una democracia reinventada.
            </p>
            
            {/* Interaction box */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h3 className="text-xl font-bold mb-4">
                Pregúntale a {candidateConfig.aiName}
              </h3>
              <p className="mb-2">
                Temas locales que te importan, como por ejemplo:
              </p>
              {
                candidateConfig.localDiscussions.map((local)=> {
                  return (
                    <div className="pl-4 border-l-4 border-primary my-4 italic">
                      <p className="mb-2">{local.comment}</p>
                      <p className="text-sm text-gray-600">— {local.user}</p>
                    </div>
                  )
                })
              }
              <div className="mt-6">
                <ChatDialog showTrigger={false} open={isChatDialogOpen} onOpenChange={setIsChatDialogOpen} />
                <Button 
                  onClick={handleOpenChat}
                  className="bg-gradient-to-r from-candidate-primary to-candidate-secondary hover:from-blue-600 hover:to-teal-600 text-white font-medium py-2 px-6 rounded-full flex items-center gap-2">
                  <MicIcon size={18} />
                  Habla con AI María
                </Button>
              </div>
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
      <section className="py-12 mb-[150px] border-t border-gray-200 dark:border-gray-800">
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
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Vote button */}
            <div className="flex items-center justify-center md:justify-start">
              <div className="">
                
              </div>
              <div className="absolute" style={{ zIndex: 2 }}>
                <img 
                  src={candidateConfig.profileImage} 
                  alt={candidateConfig.name}
                  style={{ width: '100%', maxWidth: 414, maxHeight: 500, overflow: 'inherit', position: 'relative', bottom: 60 }}
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Middle info */}
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Una presidenta <span className="text-teal-400">que realmente representa tu voz.</span></h3>
              <p className="text-gray-200">
                Las propuestas y decisiones de <strong>AI María</strong> se basarán 100% en lo que piensa y siente la gente.
              </p>
            </div>
            
            {/* Right info */}
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Disponible <span className="text-teal-400">24/7, los 365 días del año</span>.</h3>
              <p className="text-gray-200">
                Una líder con la que realmente puedes hablar, desde donde estés, cuando tú quieras. <strong>AI María escucha. Y responde.</strong>
              </p>
            </div>
            <div className="mt-6 absolute" style={{ zIndex: 9 }}>
              <ChatDialog showTrigger={false} open={isChatDialogOpen} onOpenChange={setIsChatDialogOpen} />
              <Button 
                onClick={handleOpenChat}
                className="bg-gradient-to-r from-candidate-primary to-candidate-secondary hover:from-blue-600 hover:to-teal-600 text-white font-medium py-2 px-6 rounded-full flex items-center gap-2">
                <MicIcon size={18} />
                Habla con AI María
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
