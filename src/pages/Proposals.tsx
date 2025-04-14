
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ProposalCard from '@/components/ProposalCard';
import candidateConfig, { Category } from '@/config/candidate.config';
import { Button } from '@/components/ui/button';

type CategoryFilter = Category | 'all';

// Map for category labels
const categoryLabels: Record<CategoryFilter, string> = {
  all: 'Todas',
  health: 'Salud',
  economy: 'Economía',
  security: 'Seguridad',
  education: 'Educación',
  environment: 'Medio Ambiente',
  immigration: 'Inmigración',
  technology: 'Tecnología',
  foreign_policy: 'Política Exterior',
};

const Proposals = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  // Get all categories from proposals
  const categories = Array.from(
    new Set(candidateConfig.proposals.map(proposal => proposal.category))
  ) as Category[];

  // Filter proposals by selected category
  const filteredProposals = activeCategory === 'all'
    ? candidateConfig.proposals
    : candidateConfig.proposals.filter(proposal => proposal.category === activeCategory);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Mis propuestas</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Estas son mis propuestas concretas para abordar los desafíos más importantes que enfrentamos. 
            Cada una está basada en datos, experiencia y un compromiso con el bien común.
          </p>
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
            {categoryLabels.all}
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

        {/* Proposals grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>

        {filteredProposals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No hay propuestas disponibles para esta categoría en este momento.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Proposals;
