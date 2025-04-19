import { 
  Ideology,
  Category,
  Proposal,
  SocialMedia,
  VoiceProvider,
  RAGProvider,
  AIProvider,
  LocalDiscussions
} from '@/lib/providers/ai/types';
import { Shield, UserCheck, Globe, Lightbulb, Users } from 'lucide-react';
import React from 'react';

export type CandidateConfig = {
  name: string;
  aiName: string;
  emailContact: string;
  profileImage: string;
  footerImage: string;
  realImage: string;
  shortBio: string;
  longBio: string;
  localDiscussions: LocalDiscussions[]
  questionSuggestions: string[];
  socialMedia: SocialMedia[];
  ideology: Ideology;
  proposals: Proposal[];
  education: string[];
  experience: string[];
  values: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  vision: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  voiceEnabled: boolean;
  voiceConfig: {
    input: {
      provider: 'elevenlabs' | 'google' | 'openai' | 'hume' | 'aurora' | 'huggingface' | 'none';
      model: string;
      apiKey?: string;
    };
    output: {
      provider: 'elevenlabs' | 'google' | 'openai' | 'hume' | 'aurora' | 'huggingface' | 'none';
      voiceId: string;
      apiKey?: string;
    };
  };
  aiConfig: {
    provider: AIProvider | string;
    model: string;
    apiKey: string;
  };
  embedConfig: {
    model: string;
    apiKey: string;
  };
  ragConfig: {
    provider: RAGProvider;
  };
};

// Default candidate configuration for sample purposes
const candidateConfig: CandidateConfig = {
  name: "Ana María Rodríguez",
  aiName: "Especialista Constitucional",
  profileImage: "/images/candidate.png",
  footerImage: "/images/candidate.png",
  realImage: "/images/candidate_real.png",
  emailContact: "contacto@anamariarodriguez.com",
  shortBio: "Abogada constitucionalista y especialista en la Constitución Dominicana con amplia experiencia en derecho constitucional y derechos fundamentales.",
  longBio: "La perspectiva de Especialista Constitucional se basa en el profundo conocimiento de Ana María Rodríguez sobre la Constitución Dominicana. <br /><br />Ana María Rodríguez es una abogada constitucionalista con más de 15 años de experiencia en derecho constitucional. Se graduó con honores de la Universidad Autónoma de Santo Domingo y ha dedicado su carrera a la interpretación, defensa y divulgación de la Constitución Dominicana. Ha colaborado en importantes casos ante el Tribunal Constitucional y es autora de varios artículos académicos sobre los principios fundamentales de la carta magna dominicana.",
  localDiscussions: [
    {
      comment: "¿Qué establece la Constitución sobre el tema migratorio en la República Dominicana?",
      user: "Juan Pérez, ciudadano"
    },
    {
      comment: "¿Cómo garantiza la Constitución el derecho a la vivienda digna?",
      user: "Juana Gómez, profesora"
    },
    {
      comment: "¿Qué dice la Constitución sobre el ordenamiento territorial y el transporte?",
      user: "Eugenio Martínez, conductor"
    }
  ],
  socialMedia: [
    {
      platform: "twitter",
      url: "https://twitter.com/anamariarodriguez"
    },
    {
      platform: "facebook",
      url: "https://facebook.com/anamariarodriguez"
    },
    {
      platform: "instagram",
      url: "https://instagram.com/anamariarodriguez"
    }
  ],
  ideology: "progressive",
  proposals: [
    {
      id: "topic-constitution-1",
      title: "Principios Fundamentales",
      description: "Análisis de los principios fundamentales establecidos en la Constitución Dominicana (Artículos 1-7).",
      category: "education",
      resources: [
        {
          title: "Análisis: Principios Fundamentales",
          url: "/assets/propuestas/principios_fundamentales.pdf"
        }
      ]
    },
    {
      id: "topic-constitution-2",
      title: "Derechos Fundamentales",
      description: "Estudio detallado de los derechos fundamentales garantizados por la Constitución Dominicana (Artículos 37-74).",
      category: "education",
      resources: [
        {
          title: "Análisis: Derechos Fundamentales",
          url: "/assets/propuestas/derechos_fundamentales.pdf"
        }
      ]
    },
    {
      id: "topic-constitution-3",
      title: "Garantías de los Derechos Fundamentales",
      description: "Análisis de los mecanismos constitucionales para la protección de derechos fundamentales (Artículos 68-73).",
      category: "education",
      resources: [
        {
          title: "Análisis: Garantías Constitucionales",
          url: "/assets/propuestas/garantias_constitucionales.pdf"
        }
      ]
    },
    {
      id: "topic-constitution-4",
      title: "Poderes del Estado",
      description: "Explicación de la estructura y funciones de los poderes del Estado según la Constitución Dominicana (Artículos 76-184).",
      category: "education",
      resources: [
        {
          title: "Análisis: Poderes del Estado",
          url: "/assets/propuestas/poderes_del_estado.pdf"
        }
      ]
    },
    {
      id: "topic-constitution-5",
      title: "Economía y Finanzas Públicas",
      description: "Análisis del régimen económico y financiero establecido en la Constitución Dominicana (Artículos 217-234).",
      category: "education",
      resources: [
        {
          title: "Análisis: Régimen Económico",
          url: "/assets/propuestas/regimen_economico.pdf"
        }
      ]
    },
    {
      id: "topic-constitution-6",
      title: "Reforma Constitucional",
      description: "Estudio del procedimiento para reformar la Constitución Dominicana (Artículos 267-272).",
      category: "education",
      resources: [
        {
          title: "Análisis: Reforma Constitucional",
          url: "/assets/propuestas/reforma_constitucional.pdf"
        }
      ]
    }
  ],
  questionSuggestions: [
    "¿Qué establece la Constitución Dominicana sobre la soberanía nacional?",
    "¿Cuáles son los derechos fundamentales garantizados en la Constitución Dominicana?",
    "¿Cómo funciona el procedimiento de amparo constitucional en República Dominicana?",
    "¿Qué establece la Constitución sobre la nacionalidad dominicana?",
    "¿Cuáles son las atribuciones del Tribunal Constitucional según la Constitución?",
    "¿Cómo regula la Constitución Dominicana la relación entre Estado e Iglesia?"
  ],
  education: [
    "Doctorado en Derecho Constitucional, Universidad de Salamanca, 2010",
    "Maestría en Derecho Público, Universidad Nacional Pedro Henríquez Ureña, 2005",
    "Licenciatura en Derecho, Universidad Autónoma de Santo Domingo, 2003"
  ],
  experience: [
    "Asesora del Tribunal Constitucional de la República Dominicana (2015-2020)",
    "Profesora de Derecho Constitucional, Universidad Autónoma de Santo Domingo (2010-presente)",
    "Investigadora en el Instituto de Derecho Constitucional (2005-2010)"
  ],
  values: [
    {
      id: "constitutional-rights",
      title: "Derechos Constitucionales",
      description: "Defensa y promoción de los derechos fundamentales establecidos en la Constitución Dominicana para todos los ciudadanos.",
      icon: React.createElement(Shield, { className: "text-candidate-primary" })
    },
    {
      id: "transparency",
      title: "Transparencia Institucional",
      description: "Compromiso con la transparencia institucional y la rendición de cuentas como principios establecidos en la Constitución.",
      icon: React.createElement(UserCheck, { className: "text-candidate-primary" })
    },
    {
      id: "sovereignty",
      title: "Soberanía Nacional",
      description: "Defensa de la soberanía nacional y los principios de independencia establecidos en la Constitución Dominicana.",
      icon: React.createElement(Globe, { className: "text-candidate-primary" })
    },
    {
      id: "constitutional-development",
      title: "Desarrollo Constitucional",
      description: "Promoción de la evolución e interpretación constitucional para responder a los desafíos contemporáneos.",
      icon: React.createElement(Lightbulb, { className: "text-candidate-primary" })
    },
    {
      id: "equality",
      title: "Igualdad Constitucional",
      description: "Defensa del principio de igualdad ante la ley y no discriminación establecido en la Constitución Dominicana.",
      icon: React.createElement(Users, { className: "text-candidate-primary" })
    }
  ],
  vision: "La Constitución Dominicana es la base para una sociedad justa, equitativa y próspera, donde se garantizan los derechos fundamentales y el bienestar de todos sus ciudadanos.",
  voiceEnabled: false,
  voiceConfig: {
    input: {
      provider: "openai",
      model: 'whisper-1',
      apiKey: import.meta.env.VITE_PUBLIC_HUME,
    },
    output: {
      provider: "none",
      voiceId: 'bis5ALyRHexz363PgC76',
      apiKey: import.meta.env.VITE_PUBLIC_ELEVEN_LABS,
    }
  },
  aiConfig: {
    provider: 'google',
    model: "gemini-2.0-flash",
    apiKey: import.meta.env.VITE_PUBLIC_GOOGLE_API_KEY,
  },
  embedConfig: {
    model: 'text-embedding-004',
    apiKey: import.meta.env.VITE_PUBLIC_GOOGLE_API_KEY,
  },
  ragConfig: {
    provider: "supabase",
  },
  primaryColor: "#1A365D", 
  secondaryColor: "#7E3AF2",
  accentColor: "#F7B733",
};

export default candidateConfig;