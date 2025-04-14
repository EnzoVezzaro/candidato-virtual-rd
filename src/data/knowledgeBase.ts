
import { Category } from '@/config/candidate.config';

export type KnowledgeEntry = {
  id: string;
  question: string;
  answer: string;
  categories: Category[];
  keywords: string[];
};

const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "kb-economy-1",
    question: "¿Cuál es su plan para mejorar la economía?",
    answer: "Mi plan económico se basa en tres pilares fundamentales: 1) Una reforma fiscal progresiva que alivie la carga a la clase media y pequeñas empresas; 2) Inversión en infraestructura sostenible para crear empleos de calidad; y 3) Apoyo a la innovación y emprendimiento local. Creo que una economía fuerte debe beneficiar a todos, no solo a unos pocos privilegiados.",
    categories: ["economy"],
    keywords: ["economía", "empleo", "impuestos", "reforma fiscal", "inversión"]
  },
  {
    id: "kb-health-1",
    question: "¿Cómo piensa mejorar el sistema de salud?",
    answer: "Mi propuesta para el sistema de salud incluye la ampliación de la cobertura sanitaria universal, mejorando la infraestructura hospitalaria, especialmente en zonas rurales, e invirtiendo en prevención y atención primaria. También impulsaré la reducción de precios de medicamentos esenciales y la implementación de un sistema digital integrado para historial médico.",
    categories: ["health"],
    keywords: ["salud", "hospitales", "medicamentos", "cobertura médica", "atención primaria"]
  },
  {
    id: "kb-education-1",
    question: "¿Cuáles son sus propuestas para mejorar la educación?",
    answer: "Mi plan educativo garantiza educación pública gratuita y de calidad desde preescolar hasta universidad. Priorizaré la capacitación docente continua, la modernización de infraestructura escolar, y la incorporación de tecnología en aulas. Además, implementaré programas de educación dual que vinculen el aprendizaje con experiencia laboral práctica y adaptaré el currículo para incluir competencias del siglo XXI.",
    categories: ["education"],
    keywords: ["educación", "escuelas", "universidades", "profesores", "estudiantes"]
  },
  {
    id: "kb-environment-1",
    question: "¿Cuál es su postura sobre el cambio climático?",
    answer: "El cambio climático representa una crisis existencial que requiere acción inmediata. Mi plan incluye una transición energética completa hacia fuentes renovables en los próximos 10 años, incentivos fiscales para tecnologías limpias, y regulaciones más estrictas para las industrias contaminantes. También impulsaré la reforestación masiva, la protección de ecosistemas naturales y programas educativos ambientales.",
    categories: ["environment"],
    keywords: ["cambio climático", "medio ambiente", "energía renovable", "contaminación"]
  },
  {
    id: "kb-security-1",
    question: "¿Cómo va a mejorar la seguridad ciudadana?",
    answer: "Mi enfoque para mejorar la seguridad ciudadana se basa en un modelo preventivo e integral. Esto incluye inversión social en comunidades vulnerables, programas de oportunidades para jóvenes, modernización y profesionalización de las fuerzas policiales con enfoque en derechos humanos, y reformas al sistema judicial para garantizar procesos más rápidos y justos, combatiendo la impunidad.",
    categories: ["security"],
    keywords: ["seguridad", "delincuencia", "policía", "prevención", "justicia"]
  },
  {
    id: "kb-immigration-1",
    question: "¿Cuál es su postura sobre la inmigración?",
    answer: "Creo en una política migratoria humana que respete los derechos de todas las personas, independientemente de su estatus migratorio. Trabajaré para desarrollar programas de integración eficaces, simplificar los procesos de regularización, y establecer acuerdos regionales para abordar las causas fundamentales de la migración, como la pobreza y la violencia en países de origen.",
    categories: ["immigration"],
    keywords: ["inmigración", "migrantes", "fronteras", "asilo", "refugiados"]
  },
  {
    id: "kb-technology-1",
    question: "¿Qué planes tiene para impulsar la tecnología e innovación?",
    answer: "Mi plan para tecnología e innovación incluye la creación de un fondo nacional de capital semilla para startups, inversión en educación STEM desde niveles básicos, expansión de la infraestructura digital y banda ancha a todo el territorio, y establecimiento de centros de innovación regionales que conecten academia, industria y gobierno para resolver desafíos sociales mediante tecnología.",
    categories: ["technology"],
    keywords: ["tecnología", "innovación", "digital", "startups", "banda ancha"]
  },
  {
    id: "kb-foreign-policy-1",
    question: "¿Cómo sería su política exterior?",
    answer: "Mi política exterior se basará en la defensa de la soberanía nacional, la promoción de la cooperación multilateral, y el fortalecimiento de relaciones comerciales justas. Priorizaré alianzas estratégicas con países que compartan nuestros valores democráticos y de derechos humanos, buscaré diversificar nuestras relaciones comerciales, y tendré una participación activa en foros internacionales sobre cambio climático y desarrollo sostenible.",
    categories: ["foreign_policy"],
    keywords: ["política exterior", "relaciones internacionales", "diplomacia", "tratados", "comercio internacional"]
  }
];

export default knowledgeBase;
