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
  name: "María Rodríguez Alcantara",
  aiName: "AI María",
  profileImage: "/images/candidate.png",
  footerImage: "/images/candidate.png",
  emailContact: "contacto@mariarodriguezalcantara.com",
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
      url: "https://instagram.com/aikarla" // Placeholder URL
    }
  ],
  ideology: "conservative", // Updated ideology
  proposals: [ // Updated proposals reflecting conservative/nationalist stance
    {
      id: "prop-immigration-1",
      title: "Fortalecimiento de la Soberanía y Control Migratorio Estricto",
      description: "Implementación de políticas rigurosas para el control fronterizo, deportación de inmigrantes ilegales y priorización de la mano de obra nacional.",
      category: "immigration", // Changed category order
      resources: [
        {
          title: "Plan de Control Migratorio", // Placeholder PDF name
          url: "/assets/propuestas/control_migratorio_estricto.pdf" // Placeholder PDF path
        }
      ]
    },
    {
      id: "prop-values-1",
      title: "Defensa de los Valores Tradicionales y la Familia",
      description: "Promoción de políticas públicas que refuercen la estructura familiar tradicional, los valores cristianos y la cultura dominicana.",
      category: "education", // Changed category to fit existing types
      resources: [
        {
          title: "Iniciativa por los Valores Familiares", // Placeholder PDF name
          url: "/assets/propuestas/defensa_valores_familiares.pdf" // Placeholder PDF path
        }
      ]
    },
    {
      id: "prop-economy-1",
      title: "Estímulo a la Inversión Nacional y Reducción de Impuestos",
      description: "Reducción de la carga fiscal para empresas nacionales, incentivos para la creación de empleos locales y fomento del emprendimiento dominicano.",
      category: "economy",
      resources: [
        {
          title: "Plan de Estímulo Económico Nacional", // Placeholder PDF name
          url: "/assets/propuestas/estimulo_inversion_nacional.pdf" // Placeholder PDF path
        }
      ]
    },
    {
      id: "prop-security-1",
      title: "Seguridad Ciudadana con Mano Dura",
      description: "Aumento de la presencia policial, endurecimiento de penas para delitos graves y combate frontal contra el crimen organizado y la delincuencia común.",
      category: "security",
      resources: [
        {
          title: "Estrategia de Seguridad Nacional", // Placeholder PDF name
          url: "/assets/propuestas/seguridad_mano_dura.pdf" // Placeholder PDF path
        }
      ]
    },
    {
      id: "prop-education-1",
      title: "Reforma Educativa con Enfoque en Valores Patrios",
      description: "Revisión del currículo escolar para fortalecer la enseñanza de la historia dominicana, los valores cívicos, la disciplina y el respeto a los símbolos patrios.",
      category: "education",
      resources: [
        {
          title: "Reforma Educativa Nacionalista", // Placeholder PDF name
          url: "/assets/propuestas/reforma_educativa_valores.pdf" // Placeholder PDF path
        }
      ]
    },
    {
      id: "prop-production-1",
      title: "Protección de la Producción Nacional",
      description: "Implementación de medidas para proteger a los productores locales frente a la competencia desleal, subsidios estratégicos y fomento del consumo de productos dominicanos.",
      category: "economy", // Could also be 'agriculture' or similar
      resources: [
        {
          title: "Plan de Protección al Productor Nacional", // Placeholder PDF name
          url: "/assets/propuestas/proteccion_produccion_nacional.pdf" // Placeholder PDF path
        }
      ]
    }
  ],
  questionSuggestions: [ // Updated suggestions
    "¿Qué medidas específicas propone para controlar la inmigración ilegal?",
    "¿Cómo planea defender los valores tradicionales en la legislación?",
    "¿Qué incentivos fiscales ofrecerá a las empresas nacionales?",
    "¿Cuál es su plan para reducir la criminalidad en las calles?",
    "¿Cómo incorporará los valores patrios en el currículo escolar?",
    "¿De qué manera protegerá a los agricultores locales?",
    "¿Cuál es su postura sobre los acuerdos de libre comercio?",
    "¿Qué rol juega la fe en su visión de gobierno?",
    "¿Cómo piensa fortalecer las fuerzas armadas y la policía?",
    "¿Qué hará para promover el orgullo nacional?"
  ],
  education: [ // Updated education
    "Maestría en Derecho Corporativo, Pontificia Universidad Católica Madre y Maestra (PUCMM), 2008", // Placeholder
    "Licenciatura en Derecho, Universidad Autónoma de Santo Domingo (UASD), 2005" // Placeholder
  ],
  experience: [ // Updated experience
    "Socia Directora, Vargas & Asociados - Derecho Corporativo (2012-Presente)", // Placeholder
    "Asesora Legal Senior, Grupo Empresarial Dominicano (2008-2012)", // Placeholder
    "Coordinadora Nacional, Movimiento Patriótico Dominicano (2015-Presente)" // Placeholder
  ],
  values: [ // Updated values
    {
      id: "sovereignty",
      title: "Soberanía Nacional",
      description: "Defenderé incansablemente las fronteras, la independencia y los intereses de la República Dominicana ante cualquier influencia externa.",
      icon: React.createElement(Shield, { className: "text-candidate-primary" }) // Reusing icon
    },
    {
      id: "order-security",
      title: "Orden y Seguridad",
      description: "Implementaré mano dura contra la delincuencia para garantizar la paz y la tranquilidad de todas las familias dominicanas.",
      icon: React.createElement(UserCheck, { className: "text-candidate-primary" }) // Reusing icon
    },
    {
      id: "family-tradition",
      title: "Valores Familiares y Tradicionales",
      description: "Protegeré la institución familiar como núcleo de la sociedad y promoveré los valores cristianos que nos definen como nación.",
      icon: React.createElement(Users, { className: "text-candidate-primary" }) // Reusing icon
    },
    {
      id: "national-economy",
      title: "Economía al Servicio de la Nación",
      description: "Fomentaré la producción local, la inversión dominicana y la creación de empleos dignos para nuestra gente.",
      icon: React.createElement(Lightbulb, { className: "text-candidate-primary" }) // Reusing icon
    },
    {
      id: "patriotism",
      title: "Patriotismo y Unidad Nacional",
      description: "Inspiraré el orgullo por nuestra bandera, nuestra historia y nuestra cultura, fortaleciendo la unidad del pueblo dominicano.",
      icon: React.createElement(Globe, { className: "text-candidate-primary" }) // Reusing icon
    }
  ],
  vision: "Por una República Dominicana fuerte, soberana y orgullosa de sus raíces, donde el orden, la familia y el trabajo duro sean los pilares del progreso y la prosperidad nacional.", // Updated vision
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
