import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './context/UserContext';

const Logout = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    logout()
    navigate('/login')
  }, [logout, navigate]);

  return (
    <div className="flex flex-col justify-center items-center mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Logging Out</h2>
    </div>
  );
};

export default Logout;