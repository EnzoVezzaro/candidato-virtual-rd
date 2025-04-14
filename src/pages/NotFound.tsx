
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold mb-4 text-candidate-primary">404</h1>
        <h2 className="text-2xl font-medium mb-6">Página no encontrada</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link to="/">
          <Button className="bg-candidate-secondary hover:bg-candidate-primary">
            <HomeIcon size={18} className="mr-2" />
            Volver al inicio
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
