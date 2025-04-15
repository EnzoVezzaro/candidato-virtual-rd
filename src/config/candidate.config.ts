import { 
  Ideology,
  Category,
  Proposal,
  SocialMedia,
  VoiceProvider,
  AIModel,
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
  shortBio: string;
  longBio: string;
  localDiscussions: LocalDiscussions[]
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
  aiName: "AI María",
  profileImage: "/images/candidate.png",
  footerImage: "/images/candidate.png",
  emailContact: "contacto@anamariarodriguez.com",
  shortBio: "Economista, activista social y candidata a la gobernación comprometida con la justicia social y el desarrollo sostenible.",
  longBio: "Las políticas de AI Ana Maria serán implementadas por la 'verdadera' Ana María Rodríguez, quien asistirá al Gobierno; por lo tanto, también es importante que los votantes conozcan su trayectoria, actitudes y capacidades. <br /><br />Ana María Rodríguez es una economista con más de 15 años de experiencia en políticas públicas y desarrollo económico. Nacida y criada en una familia trabajadora, Ana María conoce de primera mano los desafíos que enfrentan las familias de clase media. Su carrera ha estado dedicada a crear oportunidades económicas para todos y luchar por un sistema más justo y equitativo.",
  localDiscussions: [
    {
      comment: "¿Qué crees que deberíamos hacer con el tema de la migración en el país?",
      user: "Juan Pérez, empresario"
    },
    {
      comment: "¿Cuál es tu propuesta para resolver el problema de la vivienda?",
      user: "Juana Gómez, profesora"
    },
    {
      comment: "¿Qué crees que deberíamos hacer con el tema del transito?",
      user: "Eugenio Martinez, chofer"
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
      id: "prop-economy-1",
      title: "Reforma Fiscal Progresiva",
      description: "Implementación de un sistema tributario más justo que reduzca la carga fiscal para la clase media y aumente las contribuciones de los grandes capitales y corporaciones.",
      category: "economy",
      resources: [
        {
          title: "Reforma Fiscal Progresiva",
          url: "/public/assets/propuestas/reforma_fiscal_progresiva.pdf"
        }
      ]
    },
    {
      id: "prop-health-1",
      title: "Salud Universal Accesible",
      description: "Ampliación del sistema de salud pública para garantizar acceso universal a servicios médicos de calidad, con énfasis en prevención y atención primaria.",
      category: "health",
      resources: [
        {
          title: "Salud Universal Accesible",
          url: "/public/assets/propuestas/salud_universal_accesible.pdf"
        }
      ]
    },
    {
      id: "prop-education-1",
      title: "Educación Gratuita y de Calidad",
      description: "Garantizar educación pública gratuita desde preescolar hasta universidad, con inversión en infraestructura, tecnología y capacitación docente.",
      category: "education",
      resources: [
        {
          title: "Educacion Gratuita y de Calidad",
          url: "/public/assets/propuestas/educacion_gratuita_y_de_calidad.pdf"
        }
      ]
    },
    {
      id: "prop-environment-1",
      title: "Transición Energética Verde",
      description: "Plan de 10 años para transformar la matriz energética hacia fuentes renovables, creando empleos verdes y reduciendo emisiones de carbono.",
      category: "environment",
      resources: [
        {
          title: "Transición Energética Verde",
          url: "/public/assets/propuestas/transición_energética_verde.pdf"
        }
      ]
    },
    {
      id: "prop-security-1",
      title: "Reforma Integral de Seguridad",
      description: "Enfoque preventivo que combine inversión social en comunidades vulnerables con modernización y profesionalización de cuerpos policiales.",
      category: "security",
      resources: [
        {
          title: "Reforma Integral de Seguridad",
          url: "/public/assets/propuestas/reforma_integral_de_seguridad.pdf"
        }
      ]
    }
  ],
  education: [
    "Doctorado en Economía, Universidad Nacional, 2010",
    "Maestría en Políticas Públicas, Universidad Internacional, 2005",
    "Licenciatura en Economía, Universidad Estatal, 2003"
  ],
  experience: [
    "Directora de Desarrollo Económico, Ministerio de Economía (2015-2020)",
    "Asesora económica en el Congreso Nacional (2010-2015)",
    "Investigadora en el Instituto de Políticas Públicas (2005-2010)"
  ],
  values: [
    {
      id: "social-justice",
      title: "Justicia social e igualdad de oportunidades",
      description: "Trabajaré para crear un sistema donde todos tengan acceso equitativo a recursos, oportunidades y protecciones sociales independientemente de su origen.",
      icon: React.createElement(Shield, { className: "text-candidate-primary" })
    },
    {
      id: "transparency",
      title: "Transparencia y gobierno abierto",
      description: "Me comprometo a una gestión pública transparente donde la ciudadanía pueda participar activamente en la toma de decisiones y acceder a información clara.",
      icon: React.createElement(UserCheck, { className: "text-candidate-primary" })
    },
    {
      id: "sustainability",
      title: "Desarrollo sostenible y responsabilidad ambiental",
      description: "Impulsaré políticas que equilibren el crecimiento económico con la protección del medio ambiente, asegurando recursos para generaciones futuras.",
      icon: React.createElement(Globe, { className: "text-candidate-primary" })
    },
    {
      id: "innovation",
      title: "Innovación y adaptación tecnológica",
      description: "Promoveré la transformación digital inclusiva que mejore servicios públicos y facilite la participación ciudadana a través de tecnologías accesibles.",
      icon: React.createElement(Lightbulb, { className: "text-candidate-primary" })
    },
    {
      id: "diversity",
      title: "Diversidad e inclusión",
      description: "Defenderé una sociedad que celebre y proteja la diversidad en todas sus formas, garantizando derechos y oportunidades para todos los grupos sociales.",
      icon: React.createElement(Users, { className: "text-candidate-primary" })
    }
  ],
  vision: "Por un país próspero, justo y sostenible donde cada persona pueda desarrollar su potencial, con instituciones fuertes, economía dinámica y respeto por el medio ambiente.",
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
    model: 'gemini-embedding-exp-03-07',
    apiKey: import.meta.env.VITE_PUBLIC_GOOGLE_API_KEY,
  },
  ragConfig: {
    provider: "supabase",
  },
  primaryColor: "#1A365D",
  secondaryColor: "#7E3AF2",
  accentColor: "#F7B733"
};

export default candidateConfig;