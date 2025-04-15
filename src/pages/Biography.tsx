
import React from 'react';
import Layout from '@/components/Layout';
import candidateConfig from '@/config/candidate.config';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, GraduationCap, Heart, MedalIcon, MessageSquareIcon } from 'lucide-react';
import ChatDialog from '@/components/Chat/ChatDialog';
import { useState } from 'react';

const Biography = () => {
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatDialogOpen(true);
  };

  const ideologyLabel = () => {
    switch (candidateConfig.ideology) {
      case 'progressive':
        return 'Progresista';
      case 'conservative':
        return 'Conservador';
      case 'liberal':
        return 'Liberal';
      case 'centrist':
        return 'Centrista';
      case 'socialist':
        return 'Socialista';
      case 'libertarian':
        return 'Libertario';
      default:
        return candidateConfig.ideology;
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Biografía</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Conozca a {candidateConfig.name}
          </p>
        </div>

        {/* Profile section */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img 
                  src={candidateConfig.profileImage} 
                  alt={candidateConfig.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <h2 className="text-2xl font-bold mb-2">{candidateConfig.name}</h2>
                <p className="text-candidate-secondary dark:text-candidate-accent font-medium mb-4">
                  {ideologyLabel()}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6" dangerouslySetInnerHTML={{ __html: candidateConfig.longBio }} />
                <div className="flex flex-wrap gap-4">
                  <Link to="/propuestas">
                    <Button variant="outline">
                      Ver propuestas
                    </Button>
                  </Link>
                  <Button 
                    className="bg-candidate-secondary hover:bg-candidate-primary text-white"
                    onClick={handleOpenChat}
                  >
                    <MessageSquareIcon size={16} className="mr-2" />
                    Hablar conmigo
                  </Button>
                </div>
                <ChatDialog showTrigger={false} open={isChatDialogOpen} onOpenChange={setIsChatDialogOpen} />
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <GraduationCap size={24} className="text-candidate-secondary dark:text-candidate-accent mr-2" />
            <h2 className="text-2xl font-bold">Educación</h2>
          </div>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-4">
                {candidateConfig.education.map((education, index) => (
                  <li key={index} className="border-l-2 border-candidate-secondary dark:border-candidate-accent pl-4 py-1">
                    {education}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Experience */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Briefcase size={24} className="text-candidate-secondary dark:text-candidate-accent mr-2" />
            <h2 className="text-2xl font-bold">Experiencia</h2>
          </div>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-4">
                {candidateConfig.experience.map((experience, index) => (
                  <li key={index} className="border-l-2 border-candidate-secondary dark:border-candidate-accent pl-4 py-1">
                    {experience}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Values */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Heart size={24} className="text-candidate-secondary dark:text-candidate-accent mr-2" />
            <h2 className="text-2xl font-bold">Valores</h2>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {candidateConfig.values.map((value, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <MedalIcon size={18} className="text-candidate-secondary dark:text-candidate-accent mt-1" />
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Vision */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-candidate-primary to-candidate-secondary rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Mi visión</h2>
            <p className="text-lg">
              {candidateConfig.vision}
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Biography;
