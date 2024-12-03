// src/pages/Error/ProtectedRouteError.tsx
import React from 'react';

const ProtectedRouteError: React.FC = () => {
  return (
    <div>
      <h1>Acesso Negado</h1>
      <p>Você precisa estar logado para acessar esta página. Por favor, faça login.</p>
    </div>
  );
};

export default ProtectedRouteError;
