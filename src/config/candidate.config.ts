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
  name: "Raul Almonte Peguero",
  aiName: "AI Raul",
  profileImage: "/images/candidate.png",
  footerImage: "/images/candidate.png",
  realImage: "/images/candidate_real.png",
  emailContact: "contacto@raulalmonte.com",
  shortBio: "Político experimentado y candidato a la gobernación comprometido con el progreso equilibrado y la democracia.",
  longBio: "Las políticas de AI Raul serán implementadas por el 'verdadero' Raul Almonte Peguero, quien asistirá al Gobierno; por lo tanto, también es importante que los votantes conozcan su trayectoria, actitudes y capacidades. <br /><br />Raul Almonte Peguero es un abogado y político con más de 20 años de experiencia en la administración pública y el sector privado. Con un enfoque centrista y democrático, Raul busca construir consensos y promover políticas que beneficien a toda la ciudadanía, fomentando el crecimiento económico y la estabilidad social.",
  localDiscussions: [
    {
      comment: "¿Cuál es su plan para mejorar la economía y crear empleos?",
      user: "Carlos Méndez, ingeniero"
    },
    {
      comment: "¿Qué medidas propone para fortalecer la seguridad ciudadana?",
      user: "Sofía Vargas, comerciante"
    },
    {
      comment: "¿Cómo piensa abordar los desafíos del sistema educativo?",
      user: "Elena Cruz, maestra"
    }
  ],
  socialMedia: [
    {
      platform: "twitter",
      url: "https://twitter.com/raulalmonte" // Placeholder URL
    },
    {
      platform: "facebook",
      url: "https://facebook.com/raulalmonte" // Placeholder URL
    },
    {
      platform: "instagram",
      url: "https://instagram.com/raulalmonte" // Placeholder URL
    }
  ],
  ideology: "centrist", // Changed ideology
  proposals: [
    {
      id: "prop-economy-1",
      title: "Modernización Fiscal", // Renamed proposal
      description: "Implementación de un sistema tributario equilibrado que fomente la inversión, simplifique procesos y asegure la sostenibilidad fiscal.", // Centrist description
      category: "economy",
      resources: [
        {
          title: "Modernización Fiscal",
          url: "/assets/propuestas/reforma_fiscal_progresiva.pdf"
        }
      ]
    },
    {
      id: "prop-health-1",
      title: "Fortalecimiento del Sistema de Salud", // Renamed proposal
      description: "Mejora del sistema de salud pública para garantizar acceso equitativo a servicios médicos de calidad, optimizando la gestión y los recursos.", // Centrist description
      category: "health",
      resources: [
        {
          title: "Fortalecimiento del Sistema de Salud",
          url: "/assets/propuestas/salud_universal_accesible.pdf"
        }
      ]
    },
    {
      id: "prop-education-1",
      title: "Educación de Calidad para el Futuro", // Renamed proposal
      description: "Impulsar la calidad educativa en todos los niveles, invirtiendo en infraestructura, tecnología y formación docente para preparar a los estudiantes para los desafíos del siglo XXI.", // Centrist description
      category: "education",
      resources: [
        {
          title: "Educacion de Calidad para el Futuro",
          url: "/assets/propuestas/educacion_gratuita_y_de_calidad.pdf"
        }
      ]
    },
    {
      id: "prop-environment-1",
      title: "Desarrollo Sostenible y Energía Limpia", // Renamed proposal
      description: "Promover un desarrollo económico compatible con la protección ambiental, incentivando el uso de energías limpias y la gestión eficiente de recursos.", // Centrist description
      category: "environment",
      resources: [
        {
          title: "Desarrollo Sostenible y Energía Limpia",
          url: "/assets/propuestas/transicion_energetica_verde.pdf"
        }
      ]
    },
    {
      id: "prop-security-1",
      title: "Seguridad Ciudadana y Convivencia", // Renamed proposal
      description: "Fortalecer la seguridad ciudadana mediante la modernización policial, la prevención del delito y la promoción de la convivencia pacífica en las comunidades.", // Centrist description
      category: "security",
      resources: [
        {
          title: "Seguridad Ciudadana y Convivencia",
          url: "/assets/propuestas/reforma_integral_de_seguridad.pdf"
        }
      ]
    },
    {
      id: "prop-immigration-1",
      title: "Gestión Migratoria Ordenada y Humana", // Renamed proposal
      description: "Implementar una política migratoria que equilibre el control fronterizo con el respeto a los derechos humanos y la integración ordenada de los inmigrantes.", // Centrist description
      category: "immigration",
      resources: [
        {
          title: "Gestión Migratoria Ordenada y Humana",
          url: "/assets/propuestas/politica_inmigracion_ordenada_y_humana.pdf"
        }
      ]
    }
  ],
  questionSuggestions: [ // Updated suggestions for centrist candidate
    "¿Cuál es su plan para impulsar el crecimiento económico?",
    "¿Cómo propone modernizar el sistema fiscal del país?",
    "¿Qué medidas tomará para mejorar la eficiencia del sistema de salud?",
    "¿Cómo piensa fortalecer la calidad de la educación pública?",
    "¿Cuál es su estrategia para promover las energías limpias?",
    "¿Cómo abordará el desafío de la seguridad ciudadana?",
    "¿Qué propone para una gestión migratoria más efectiva?",
    "¿Cómo fomentará la creación de empleo?"
  ],
  education: [ // Placeholder education
    "Maestría en Administración Pública, Universidad Central, 2002",
    "Licenciatura en Derecho, Universidad Nacional, 1998"
  ],
  experience: [ // Placeholder experience
    "Senador de la República (2016-2024)",
    "Secretario de Estado (2010-2014)",
    "Abogado en firma privada (2002-2010)"
  ],
  values: [
    {
      id: "progress-stability", // Updated ID and content
      title: "Progreso y Estabilidad",
      description: "Buscaré un desarrollo equilibrado que combine el crecimiento económico con la estabilidad social y política del país.",
      icon: React.createElement(Shield, { className: "text-candidate-primary" })
    },
    {
      id: "democracy-participation", // Updated ID and content
      title: "Democracia y Participación Ciudadana",
      description: "Fomentaré una democracia sólida con instituciones transparentes y mecanismos efectivos para la participación ciudadana en la toma de decisiones.",
      icon: React.createElement(UserCheck, { className: "text-candidate-primary" })
    },
    {
      id: "responsibility-efficiency", // Updated ID and content
      title: "Responsabilidad y Eficiencia Fiscal",
      description: "Gestionaré los recursos públicos con responsabilidad, buscando la eficiencia en el gasto y la sostenibilidad de las finanzas del Estado.",
      icon: React.createElement(Globe, { className: "text-candidate-primary" })
    },
    {
      id: "opportunity-growth", // Updated ID and content
      title: "Oportunidad y Crecimiento Económico",
      description: "Impulsaré políticas que generen oportunidades para todos y fomenten un crecimiento económico inclusivo y sostenible a largo plazo.",
      icon: React.createElement(Lightbulb, { className: "text-candidate-primary" })
    },
    {
      id: "dialogue-consensus", // Updated ID and content
      title: "Diálogo y Búsqueda de Consensos",
      description: "Promoveré el diálogo constructivo entre diferentes sectores de la sociedad para encontrar soluciones consensuadas a los desafíos del país.",
      icon: React.createElement(Users, { className: "text-candidate-primary" })
    }
  ],
  vision: "Construir un país moderno, seguro y con oportunidades para todos, basado en una democracia sólida, una economía competitiva y un Estado eficiente al servicio de la ciudadanía.", // Updated vision
  voiceEnabled: false, // Keeping voice disabled for now
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
