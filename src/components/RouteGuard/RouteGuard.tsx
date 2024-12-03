import React from 'react';
import { Navigate } from 'react-router-dom';

interface RouteGuardProps {
  children: React.ReactNode;
  isValidRoute: boolean; 
  redirectTo: string;    
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, isValidRoute, redirectTo }) => {
  if (!isValidRoute) {

    return <Navigate to={redirectTo} replace />;
  }
  return <>{children}</>; 
};

export default RouteGuard;
