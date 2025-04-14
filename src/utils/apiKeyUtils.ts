
// Este archivo maneja el almacenamiento seguro de claves API para los proveedores de IA

// Obtener clave API almacenada
export const getStoredApiKey = (provider: string): string => {
  const key = localStorage.getItem(`${provider}_api_key`);
  return key || '';
};

// Almacenar clave API
export const storeApiKey = (provider: string, apiKey: string): void => {
  localStorage.setItem(`${provider}_api_key`, apiKey);
};

// Verificar si existe una clave API para un proveedor
export const hasApiKey = (provider: string): boolean => {
  const key = getStoredApiKey(provider);
  return key !== '' && key !== null;
};

// Eliminar clave API
export const removeApiKey = (provider: string): void => {
  localStorage.removeItem(`${provider}_api_key`);
};

// Obtener todas las claves API almacenadas
export const getAllStoredApiKeys = (): Record<string, string> => {
  const providers = ['openai', 'anthropic', 'google', 'groq', 'xai', 'openrouter'];
  const keys: Record<string, string> = {};
  
  providers.forEach(provider => {
    const key = getStoredApiKey(provider);
    if (key) {
      keys[provider] = key;
    }
  });
  
  return keys;
};
