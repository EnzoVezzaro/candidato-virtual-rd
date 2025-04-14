
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Home';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Si la URL es exactamente "/chat", no redirigir
    if (window.location.pathname === '/chat') {
      return;
    }
    
    // Comprobar si la URL actual es la raíz "/"
    if (window.location.pathname === '/') {
      // Opcionalmente, puedes dejar que se quede en Home
      // O redirigir a la página de chat con un parámetro de bienvenida
      // navigate('/chat?welcome=true');
    }
  }, [navigate]);
  
  return <Home />;
};

export default Index;
