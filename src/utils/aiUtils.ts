
import candidateConfig from "@/config/candidate.config";
import knowledgeBase, { KnowledgeEntry } from "@/data/knowledgeBase";
/*
// Simple search function to find relevant knowledge entries
export const searchKnowledgeBase = (query: string): KnowledgeEntry[] => {
  const normalizedQuery = query.toLowerCase();
  const words = normalizedQuery.split(/\s+/);
  
  // Score each entry based on keyword matches
  const scoredEntries = knowledgeBase.map(entry => {
    let score = 0;
    
    // Check if any keywords match
    entry.keywords.forEach(keyword => {
      if (words.some(word => keyword.toLowerCase().includes(word))) {
        score += 5;
      }
    });
    
    // Check if query contains the category
    entry.categories.forEach(category => {
      if (normalizedQuery.includes(category)) {
        score += 3;
      }
    });
    
    // Check for question similarity
    if (entry.question.toLowerCase().includes(normalizedQuery)) {
      score += 10;
    }
    
    return { entry, score };
  });
  
  // Filter and sort results by score
  const results = scoredEntries
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.entry);
    
  return results;
};

// Function to generate a response based on the candidate's ideology and knowledge
export const generateResponse = async (
  query: string,
  fallbackText = "Lo siento, no tengo suficiente información sobre ese tema específico. ¿Hay algo más sobre mis propuestas en que pueda ayudarte?"
): Promise<string> => {
  try {
    // Search for relevant entries
    const relevantEntries = searchKnowledgeBase(query);
    
    if (relevantEntries.length > 0) {
      // For now, just return the most relevant answer
      // In a real implementation, this would use an LLM API
      return relevantEntries[0].answer;
    }
    
    // If no relevant information is found, return a fallback response
    return fallbackText;
  } catch (error) {
    console.error("Error generating response:", error);
    return "Lo siento, ha ocurrido un error al procesar tu pregunta. Por favor, intenta nuevamente.";
  }
};
*/