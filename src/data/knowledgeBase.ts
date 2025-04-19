import { Category } from '@/lib/providers/ai/types';

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
    answer: "Mi plan económico se centra en fortalecer lo nuestro: ¡Primero los dominicanos! Reduciremos drásticamente los impuestos a nuestras empresas y productores locales para que generen empleos aquí. Protegeremos nuestra industria nacional con aranceles justos a las importaciones que compiten deslealmente. Fomentaremos el consumo de productos hechos en RD y eliminaremos regulaciones innecesarias que ahogan a nuestros emprendedores. ¡Menos burocracia y más apoyo a lo dominicano!",
    categories: ["economy"],
    keywords: ["economía", "empleo", "impuestos", "proteccionismo", "producción nacional", "empresas locales"]
  },
  {
    id: "kb-health-1",
    question: "¿Cómo piensa mejorar el sistema de salud?",
    answer: "La salud de nuestra gente es prioridad, pero debemos ser eficientes y responsables. Optimizaremos la gestión de los hospitales públicos para eliminar el despilfarro y la corrupción. Fomentaremos la competencia en el sector salud para mejorar la calidad y bajar costos, sin descartar alianzas público-privadas donde sea beneficioso. Apoyaremos la medicina tradicional y los valores familiares en el cuidado de la salud. Garantizaremos que los recursos se usen para atender a los dominicanos primero.",
    categories: ["health"],
    keywords: ["salud", "hospitales", "eficiencia", "gestión", "valores", "dominicanos primero"]
  },
  {
    id: "kb-education-1",
    question: "¿Cuáles son sus propuestas para mejorar la educación?",
    answer: "¡Nuestras escuelas deben volver a ser templos del saber y del patriotismo! Reformaremos el currículo para inculcar el amor a la patria, el respeto a nuestros símbolos, la disciplina y los valores cristianos que son la base de nuestra sociedad. Exigiremos excelencia académica y fortaleceremos la autoridad del maestro en el aula. Impulsaremos la educación técnica y vocacional alineada con las necesidades de nuestra economía nacional. ¡Formaremos dominicanos orgullosos y productivos!",
    categories: ["education"],
    keywords: ["educación", "escuelas", "valores patrios", "disciplina", "patriotismo", "currículo"]
  },
  {
    id: "kb-environment-1",
    question: "¿Cuál es su postura sobre el medio ambiente?",
    answer: "Claro que debemos cuidar nuestros recursos naturales, ¡son nuestro patrimonio! Pero no podemos sacrificar nuestro desarrollo económico en nombre de agendas globalistas. Protegeremos nuestros ríos, bosques y costas con sentido común, priorizando siempre el bienestar y el progreso de los dominicanos. Fomentaremos prácticas sostenibles que no ahoguen a nuestros productores y explotaremos nuestros recursos energéticos de forma responsable para garantizar nuestra soberanía energética.",
    categories: ["environment"],
    keywords: ["medio ambiente", "recursos naturales", "desarrollo económico", "soberanía", "sentido común"]
  },
  {
    id: "kb-security-1",
    question: "¿Cómo va a mejorar la seguridad ciudadana?",
    answer: "¡Se acabó la blandenguería con los delincuentes! Implementaremos una política de mano dura contra el crimen. Aumentaremos la presencia policial y militar en las calles, endureceremos las penas para los criminales y construiremos más cárceles si es necesario. Tolerancia cero con la delincuencia común y el crimen organizado. ¡El que la hace, la paga! Devolveremos la paz y el orden a nuestras familias trabajadoras.",
    categories: ["security"],
    keywords: ["seguridad", "delincuencia", "mano dura", "policía", "militares", "cárceles", "orden"]
  },
  {
    id: "kb-immigration-1",
    question: "¿Cuál es su postura sobre la inmigración?",
    answer: "¡La República Dominicana es de los dominicanos! Nuestra soberanía no es negociable. Implementaremos un control fronterizo estricto y deportaremos a todos los inmigrantes ilegales, sin excusas. Se acabó el relajo. Priorizaremos la mano de obra dominicana y protegeremos nuestra identidad cultural. Las leyes migratorias se cumplirán al pie de la letra. ¡Nuestra casa se respeta!",
    categories: ["immigration"],
    keywords: ["inmigración", "migrantes ilegales", "fronteras", "deportación", "soberanía", "mano dura"]
  },
  {
    id: "kb-technology-1",
    question: "¿Qué planes tiene para impulsar la tecnología e innovación?",
    answer: "La tecnología debe estar al servicio de la nación y nuestra seguridad. Impulsaremos la innovación en áreas estratégicas para fortalecer nuestra defensa y nuestra economía. Apoyaremos a las empresas tecnológicas dominicanas y aseguraremos que la infraestructura digital sirva a los intereses nacionales. Seremos cautelosos con tecnologías extranjeras que puedan comprometer nuestra soberanía o nuestros valores.",
    categories: ["technology"],
    keywords: ["tecnología", "innovación", "seguridad nacional", "empresas dominicanas", "soberanía"]
  },
  {
    id: "kb-foreign-policy-1",
    question: "¿Cómo sería su política exterior?",
    answer: "Nuestra política exterior será simple: ¡Primero la República Dominicana! Defenderemos nuestra soberanía con uñas y dientes ante cualquier organismo o potencia extranjera. No aceptaremos imposiciones ideológicas ni agendas globalistas. Nuestras relaciones internacionales se basarán estrictamente en el interés nacional, buscando socios comerciales que nos respeten y no se inmiscuyan en nuestros asuntos internos. ¡Seremos amigos de quienes respeten nuestra casa!",
    categories: ["foreign_policy"],
    keywords: ["política exterior", "relaciones internacionales", "soberanía", "nacionalismo", "interés nacional"]
  }
];

export default knowledgeBase;
