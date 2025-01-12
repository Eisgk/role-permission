import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './context/UserContext';


const SelectCompany = () => {
  const { user, login  } = useUser(); // Get user and setUser from context
  const [selectedCompanyDetails, setSelectedCompanyDetails] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSelect = (companyId) => {
    // console.log(`Selected company ID: ${companyId}`);
    
    if (user) {
      const newSelectedCompanyDetails = user.company.find(c => c.id === companyId);
      // console.log(newSelectedCompanyDetails);

      if (newSelectedCompanyDetails) {
        setSelectedCompanyDetails(newSelectedCompanyDetails);

        // const companyPermissions = user.companyPermissions[companyId] || [];

        const updatedUser = {
          ...user,
          company_id: companyId, 
          // permissions: companyPermissions,
          role: newSelectedCompanyDetails.role 
        };

        // localStorage.setItem('user', JSON.stringify(updatedUser));
        login(updatedUser);
        
        navigate('/home');
      } else {
        console.error("Company not found!");
      }
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center gap-4">
      <h1 className="text-2xl mb-4">Select Your Company</h1>
      <div className="flex flex-col gap-4">
        {user.company.map((company) => (
          <button
            key={company.id}
            onClick={() => handleSelect(company.id)}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {company.name}
          </button>
        ))}
      </div>
      {selectedCompanyDetails && (
        <div className="mt-4">
          <p>Selected Company: {selectedCompanyDetails.name}</p>
          <p>Role: {selectedCompanyDetails.role}</p>
        </div>
      )}
    </div>
  );
};

export default SelectCompany;
