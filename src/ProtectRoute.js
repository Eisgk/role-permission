import React from 'react';
import { Navigate, useParams, Outlet, useLocation } from "react-router-dom";
import { useUser } from './context/UserContext';

const ProtectRoute = ({ requiredRole }) => {
    const { user } = useUser();

    // console.log(requiredRole);
    
    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && !requiredRole.includes(user.role)) {
        return <Navigate to="/restricted" />;
      }
    
    return <Outlet />;
  };

export default ProtectRoute