
import React from 'react';
import candidateConfig from '@/config/candidate.config';
import { cn } from '@/lib/utils';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div 
      className={cn(
        "min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800",
        className
      )}
      style={{
        '--candidate-primary': candidateConfig.primaryColor,
        '--candidate-secondary': candidateConfig.secondaryColor,
        '--candidate-accent': candidateConfig.accentColor,
      } as React.CSSProperties}
    >
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
