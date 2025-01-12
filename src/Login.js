import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './context/UserContext';

const users = [
  {
    id: '1',
    email: 'test1@permify.co',
    name: 'test1 test1',
    permission: ['view_dashboard', 'edit_dashboard', 'view_plant_details', 'edit_plant_details','edit_profile'],
    username: 'test1',
    password: 'test1', 
    companyPermissions: {
      1: ['carbon_event', 'dap_menu', 'all'], 
      2: ['dap_menu'], 
      3: ['carbon_event'],
      4: ['carbon_event', 'dap_menu', 'all'],
    },
    company: [
      { id: 1, name: "company 1", role: "owner" },
      { id: 2, name: "company 2", role: "plant_admin" },
      { id: 3, name: "company 3", role: "user" },
      { id: 4, name: "company 4", role: "super_admin" },
    ]
  },
  {
    id: '2',
    email: 'test2@permify.co',
    name: 'test2 test2',
    permission: ['view_dashboard', 'view_plant_details','edit_profile'],
    username: 'test2',
    password: 'test2', 
    companyPermissions: {
      3: ['carbon_event', 'dap_menu', 'all']
    },
    company: [
      { id: 3, name: "company 3", role: "plant_admin" },
    ]
  },
  {
    id: '3',
    email: 'test3@permify.co',
    name: 'test3 test3',
    permission: ['view_dashboard'],
    username: 'test3',
    password: 'test3', 
    companyPermissions: {
      2: ["dap_menu"],
    },
    company: [
      { id: 2, name: "company 2", role: "user" },
    ]
  },
  {
    id: '4',
    email: 'test4@permify.co',
    name: 'test4 test4',
    permission: ['view_dashboard', 'edit_dashboard', 'view_plant_details', 'edit_plant_details','edit_profile'],
    username: 'test4',
    password: 'test4', 
    companyPermissions: {
      2: ['carbon_event', 'dap_menu', 'all'],
    },
    company: [
      { id: 2, name: "company 2", role: "super_admin" },
    ]
  },
];

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find((u) => u.username === username && u.password === password);
    
    if (user) {
      login(user); 
      // console.log(user);
      navigate('/select-company');
    } else {
      setError('Invalid username or password');
    }

   
  };

  return (
    <div className="p-4 w-64 mx-[45%]">
      <h1 className="text-2xl mb-4">Login</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 border border-gray-300 rounded"
        />

        <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
