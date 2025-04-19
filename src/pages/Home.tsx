
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, MessageSquareIcon, FileTextIcon, UserIcon, MicIcon } from 'lucide-react';
import candidateConfig from '@/config/candidate.config';
import ProposalCard from '@/components/ProposalCard';
import ChatDialog from '@/components/Chat/ChatDialog'; // Import ChatDialog

const Home = () => {
  // Get featured proposals (first 3)
  const featuredProposals = candidateConfig.proposals.slice(0, 3);
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState(candidateConfig.questionSuggestions);
  const [initialQuestion, setInitialQuestion] = useState('');
  
  const handleOpenChat = () => {
    setInitialQuestion('');
    setIsChatDialogOpen(true);
  };

  const handleSuggestion  = (question) => {
    setInitialQuestion(question);
    setIsChatDialogOpen(true);
  };

  useEffect(() => {
    // Scroll to the top of the page whenever the active category changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Split suggested questions into 3 rows
  const splitQuestions = () => {
    const numQuestions = suggestedQuestions.length;
    const questionsPerRow = Math.ceil(numQuestions / 3);
    
    return [
      suggestedQuestions.slice(0, questionsPerRow),
      suggestedQuestions.slice(questionsPerRow, questionsPerRow * 2),
      suggestedQuestions.slice(questionsPerRow * 2)
    ];
  };

  const questionRows = splitQuestions();
  
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
                candidateConfig.localDiscussions.map((local, i)=> {
                  return (
                    <div 
                    onClick={() => handleSuggestion(local.comment)}
                    style={{ cursor: 'pointer' }}
                    className="pl-4 border-l-4 border-primary my-4 italic" key={'local_'+i}>
                      <p className="mb-2">{local.comment}</p>
                      <p className="text-sm text-gray-600">— {local.user}</p>
                    </div>
                  )
                })
              }
              <div className="mt-6">
                <Button 
                  onClick={handleOpenChat}
                  className="bg-gradient-to-r from-candidate-primary to-candidate-secondary hover:from-blue-600 hover:to-teal-600 text-white font-medium py-2 px-6 rounded-full flex items-center gap-2">
                  <MicIcon size={18} />
                  Habla con {candidateConfig.aiName}
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
      <section className="py-12 mb-[50px] border-t border-gray-200 dark:border-gray-800">
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
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow flex flex-col items-center text-center group"
            >
              <div className="flex items-center justify-center w-20 h-20 mb-2 p-3 rounded-full bg-gradient-to-br from-candidate-primary/10 to-candidate-secondary/10 group-hover:from-candidate-primary/20 group-hover:to-candidate-secondary/20 transition-colors duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 group-hover:text-candidate-primary transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {value.description}
              </p>
            </div>
          ))}
        </div>

      </section> 

      <div className="pb-2">
        <div className="flex flex-col gap-3">
          {/* Row 1 - Left to Right */}
          <div className="overflow-hidden relative">
            <div className="flex gap-2 animate-scroll-left whitespace-nowrap pause-on-hover">
              {questionRows[0].map((question, index) => (
                <Badge
                  key={`row1-${index}`}
                  variant="secondary"
                  style={{ cursor: 'pointer' }}
                  className="cursor-pointer whitespace-nowrap rounded-full shrink-0"
                  onClick={() => handleSuggestion(question)}
                >
                  {question}
                </Badge>
              ))}
              {/* Duplicate badges for continuous scrolling */}
              {questionRows[0].map((question, index) => (
                <Badge
                  key={`row1-dup-${index}`}
                  variant="secondary"
                  style={{ cursor: 'pointer' }}
                  className="cursor-pointer whitespace-nowrap rounded-full shrink-0"
                  onClick={() => handleSuggestion(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Row 2 - Right to Left */}
          <div className="overflow-hidden relative">
            <div className="flex gap-2 animate-scroll-right whitespace-nowrap pause-on-hover">
              {questionRows[1].map((question, index) => (
                <Badge
                  key={`row2-${index}`}
                  variant="secondary"
                  style={{ cursor: 'pointer' }}
                  className="cursor-pointer whitespace-nowrap rounded-full shrink-0"
                  onClick={() => handleSuggestion(question)}
                >
                  {question}
                </Badge>
              ))}
              {/* Duplicate badges for continuous scrolling */}
              {questionRows[1].map((question, index) => (
                <Badge
                  key={`row2-dup-${index}`}
                  variant="secondary"
                  style={{ cursor: 'pointer' }}
                  className="cursor-pointer whitespace-nowrap rounded-full shrink-0"
                  onClick={() => handleSuggestion(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Row 3 - Left to Right */}
          <div className="overflow-hidden relative">
            <div className="flex gap-2 animate-scroll-left whitespace-nowrap pause-on-hover" style={{ animationDelay: '1s' }}>
              {questionRows[2].map((question, index) => (
                <Badge
                  key={`row3-${index}`}
                  variant="secondary"
                  className="cursor-pointer whitespace-nowrap rounded-full shrink-0"
                  onClick={() => handleSuggestion(question)}
                >
                  {question}
                </Badge>
              ))}
              {/* Duplicate badges for continuous scrolling */}
              {questionRows[2].map((question, index) => (
                <Badge
                  key={`row3-dup-${index}`}
                  variant="secondary"
                  className="cursor-pointer whitespace-nowrap rounded-full shrink-0"
                  onClick={() => handleSuggestion(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

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
                  src={candidateConfig.footerImage} 
                  alt={candidateConfig.name}
                  style={{ width: '100%', maxWidth: 414, maxHeight: 500, overflow: 'inherit', position: 'relative', bottom: 60 }}
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Middle info */}
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Un presidente <span className="text-teal-400">que realmente representa tu voz.</span></h3>
              <p className="text-gray-200">
                Las propuestas y decisiones de <strong>{candidateConfig.aiName}</strong> se basarán 100% en lo que piensa y siente la gente.
              </p>
            </div>
            
            {/* Right info */}
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Disponible <span className="text-teal-400">24/7, los 365 días del año</span>.</h3>
              <p className="text-gray-200">
                Una líder con la que realmente puedes hablar, desde donde estés, cuando tú quieras. <strong>{candidateConfig.aiName} escucha. Y responde.</strong>
              </p>
            </div>
            <div className="mt-6 absolute" style={{ zIndex: 9 }}>
              <Button 
                onClick={handleOpenChat}
                className="bg-gradient-to-r from-candidate-primary to-candidate-secondary hover:from-blue-600 hover:to-teal-600 text-white font-medium py-2 px-6 rounded-full flex items-center gap-2">
                <MicIcon size={18} />
                Habla con {candidateConfig.aiName}
              </Button>
            </div>
          </div>
        </div>
      </section>
      <ChatDialog 
        showTrigger={false} 
        open={isChatDialogOpen} 
        onOpenChange={setIsChatDialogOpen} 
        initialQuestion={initialQuestion}
      />

      {/* Add these styles to your global CSS or tailwind.config.js */}
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        .animate-scroll-left {
          display: inline-flex;
          animation: scrollLeft 30s linear infinite;
        }
        
        .animate-scroll-right {
          display: inline-flex;
          animation: scrollRight 30s linear infinite;
        }
        
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
