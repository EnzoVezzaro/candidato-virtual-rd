import { 
  Ideology,
  Category,
  Proposal,
  SocialMedia,
  VoiceProvider,
  AIModel,
  RAGProvider,
  AIProvider
} from '@/lib/providers/ai/types';

export type CandidateConfig = {
  name: string;
  profileImage: string;
  shortBio: string;
  longBio: string;
  socialMedia: SocialMedia[];
  ideology: Ideology;
  proposals: Proposal[];
  education: string[];
  experience: string[];
  values: string[];
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
  profileImage: "/imges/candidate.png",
  shortBio: "Economista, activista social y candidata a la gobernación comprometida con la justicia social y el desarrollo sostenible.",
  longBio: "Las políticas de AI Ana Maria serán implementadas por la “verdadera” Ana María Rodríguez, quien asistirá al Parlamento; por lo tanto, también es importante que los votantes conozcan su trayectoria, actitudes y capacidades. <br /><br />Ana María Rodríguez es una economista con más de 15 años de experiencia en políticas públicas y desarrollo económico. Nacida y criada en una familia trabajadora, Ana María conoce de primera mano los desafíos que enfrentan las familias de clase media. Su carrera ha estado dedicada a crear oportunidades económicas para todos y luchar por un sistema más justo y equitativo.",
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
          title: "Plan económico detallado",
          url: "/resources/plan-economico.pdf"
        }
      ]
    },
    {
      id: "prop-health-1",
      title: "Salud Universal Accesible",
      description: "Ampliación del sistema de salud pública para garantizar acceso universal a servicios médicos de calidad, con énfasis en prevención y atención primaria.",
      category: "health"
    },
    {
      id: "prop-education-1",
      title: "Educación Gratuita y de Calidad",
      description: "Garantizar educación pública gratuita desde preescolar hasta universidad, con inversión en infraestructura, tecnología y capacitación docente.",
      category: "education"
    },
    {
      id: "prop-environment-1",
      title: "Transición Energética Verde",
      description: "Plan de 10 años para transformar la matriz energética hacia fuentes renovables, creando empleos verdes y reduciendo emisiones de carbono.",
      category: "environment"
    },
    {
      id: "prop-security-1",
      title: "Reforma Integral de Seguridad",
      description: "Enfoque preventivo que combine inversión social en comunidades vulnerables con modernización y profesionalización de cuerpos policiales.",
      category: "security"
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
    "Justicia social e igualdad de oportunidades",
    "Transparencia y gobierno abierto",
    "Desarrollo sostenible y responsabilidad ambiental",
    "Innovación y adaptación tecnológica",
    "Diversidad e inclusión"
  ],
  vision: "Un país próspero, justo y sostenible donde cada persona pueda desarrollar su potencial, con instituciones fuertes, economía dinámica y respeto por el medio ambiente.",
  voiceEnabled: true,
  voiceConfig: {
    input: {
      provider: "openai",
      model: 'whisper-1',
      apiKey: import.meta.env.VITE_PUBLIC_HUME,
    },
    output: {
      provider: "elevenlabs",
      voiceId: 'wBnAJRbu3cj93gnAm02O',
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
