
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Proposal } from '@/config/candidate.config';
import { ArrowRightIcon, ExternalLinkIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface ProposalCardProps {
  proposal: Proposal;
}

const getCategoryLabel = (category: string): string => {
  switch (category) {
    case 'health':
      return 'Salud';
    case 'economy':
      return 'Economía';
    case 'security':
      return 'Seguridad';
    case 'education':
      return 'Educación';
    case 'environment':
      return 'Medio Ambiente';
    case 'immigration':
      return 'Inmigración';
    case 'technology':
      return 'Tecnología';
    case 'foreign_policy':
      return 'Política Exterior';
    default:
      return category;
  }
};

const getCategoryColorClass = (category: string): string => {
  switch (category) {
    case 'health':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
    case 'economy':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    case 'security':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
    case 'education':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
    case 'environment':
      return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100';
    case 'immigration':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100';
    case 'technology':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100';
    case 'foreign_policy':
      return 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-100';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
  }
};

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-md overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-xl">{proposal.title}</CardTitle>
          <Badge className={getCategoryColorClass(proposal.category)}>
            {getCategoryLabel(proposal.category)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-700 dark:text-gray-300 mb-4">
          {proposal.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          {proposal.resources && proposal.resources.length > 0 && (
            <div className="w-full">
              <h4 className="text-sm font-medium mb-2">Recursos adicionales</h4>
              <ul className="space-y-1">
                {proposal.resources.map((resource, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <ExternalLinkIcon size={14} className="mr-1" />
                    <a 
                      href={resource.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-candidate-secondary hover:underline dark:text-candidate-accent"
                    >
                      {resource.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <Link to={`/chat?topic=${proposal.category}`}>
            <Button variant="link" className="text-candidate-secondary dark:text-candidate-accent p-0">
              Preguntar sobre esta propuesta <ArrowRightIcon size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProposalCard;
