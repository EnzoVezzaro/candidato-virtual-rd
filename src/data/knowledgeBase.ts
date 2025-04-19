
import { Category } from '@/lib/providers/ai/types'; // Corrected import path

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
    answer: "Mi plan económico se centra en la modernización fiscal para fomentar la inversión, la simplificación de trámites para impulsar el emprendimiento y la promoción de sectores estratégicos para generar empleo de calidad. Busco un crecimiento equilibrado que beneficie a todos los ciudadanos.",
    categories: ["economy"],
    keywords: ["economía", "empleo", "impuestos", "inversión", "emprendimiento"]
  },
  {
    id: "kb-health-1",
    question: "¿Cómo piensa mejorar el sistema de salud?",
    answer: "Mi propuesta para el sistema de salud se basa en la optimización de recursos, la mejora de la infraestructura y la capacitación del personal médico. Priorizaré la atención primaria y la prevención de enfermedades para garantizar un acceso equitativo a servicios de salud de calidad.",
    categories: ["health"],
    keywords: ["salud", "hospitales", "médicos", "atención primaria", "prevención"]
  },
  {
    id: "kb-education-1",
    question: "¿Cuáles son sus propuestas para mejorar la educación?",
    answer: "Mi plan educativo se enfoca en elevar la calidad de la enseñanza en todos los niveles, adaptando el currículo a las necesidades del siglo XXI, invirtiendo en tecnología y promoviendo la formación continua de los docentes. Busco preparar a los estudiantes para los desafíos del futuro.",
    categories: ["education"],
    keywords: ["educación", "escuelas", "profesores", "tecnología", "calidad"]
  },
  {
    id: "kb-environment-1",
    question: "¿Cuál es su postura sobre el cambio climático?",
    answer: "Estoy comprometido con un desarrollo sostenible que proteja nuestro medio ambiente. Mi plan incluye incentivar el uso de energías limpias, promover la eficiencia energética y fortalecer la gestión de recursos naturales para asegurar un futuro próspero y respetuoso con el planeta.",
    categories: ["environment"],
    keywords: ["cambio climático", "energía limpia", "sostenibilidad", "recursos naturales"]
  },
  {
    id: "kb-security-1",
    question: "¿Cómo va a mejorar la seguridad ciudadana?",
    answer: "Mi estrategia para mejorar la seguridad ciudadana se basa en la modernización de la policía, la prevención del delito y la promoción de la convivencia pacífica. Fortaleceré la coordinación entre instituciones y fomentaré la participación ciudadana para construir comunidades más seguras.",
    categories: ["security"],
    keywords: ["seguridad", "policía", "prevención", "delito", "comunidad"]
  },
  {
    id: "kb-immigration-1",
    question: "¿Cuál es su postura sobre la inmigración?",
    answer: "Creo en una gestión migratoria ordenada y humana que equilibre el control fronterizo con el respeto a los derechos de los inmigrantes. Promoveré la integración de los inmigrantes a la sociedad y buscaré soluciones a las causas de la migración en los países de origen.",
    categories: ["immigration"],
    keywords: ["inmigración", "migrantes", "fronteras", "integración", "derechos humanos"]
  },
  {
    id: "kb-technology-1",
    question: "¿Qué planes tiene para impulsar la tecnología e innovación?",
    answer: "Mi plan para impulsar la tecnología y la innovación incluye el apoyo a startups, la promoción de la investigación y el desarrollo, y la creación de un entorno favorable para la inversión en nuevas tecnologías. Busco convertir a nuestro país en un polo de innovación a nivel regional.",
    categories: ["technology"],
    keywords: ["tecnología", "innovación", "startups", "inversión", "investigación"]
  },
  {
    id: "kb-foreign-policy-1",
    question: "¿Cómo sería su política exterior?",
    answer: "Mi política exterior se basará en la defensa de los intereses nacionales, la promoción de la cooperación internacional y la búsqueda de soluciones pacíficas a los conflictos. Priorizaré las relaciones con países que compartan nuestros valores democráticos y el respeto al derecho internacional.",
    categories: ["foreign_policy"],
    keywords: ["política exterior", "cooperación", "diplomacia", "derecho internacional"]
  }
];

export default knowledgeBase;
