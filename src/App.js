import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import { PermissionProvider } from './PermissionProvider'; 
import Login from './Login';
import Home from './Home';
import Logout from './Logout'; 
import Navbar from './components/NavBar';
import SelectCompany from './SelectCompany';
import EditProfile from './EditProfile';
import { useUser, UserProvider } from './context/UserContext';
import ProtectRoute from './ProtectRoute';
import Restricted from './Restricted';


function AppContent() {
  const { user } = useUser(); // Get the user from UserContext

  return (
    <PermissionProvider role={user ? user.role : 'viewer'}>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectRoute/>} >
          <Route path="/select-company" element={<SelectCompany/>} />
          <Route path="/home" element={<Home user={user} /> } />
          <Route path="/logout" element={<Logout />} />
          {/* <Route path='/edit-profile/:id' element={<EditProfile/>} /> */}
          <Route element={<ProtectRoute requiredRole={['super_admin','owner','plant_admin']} />}>
            <Route path="/edit-profile/:id" element={<EditProfile />} />
          </Route>
        </Route>
        <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />
        <Route path="/restricted" element={<Restricted/>} />
      </Routes>
    </PermissionProvider>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
