import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './context/UserContext';

const roles = {
  super_admin: {
    can: ['view_dashboard', 'edit_dashboard', 'view_plant_details', 'edit_plant_details','edit_profile'],
  },
  owner: {
    can: ['view_dashboard', 'edit_dashboard', 'view_plant_details', 'edit_plant_details','edit_profile'],
  },
  plant_admin: {
    can: ['view_dashboard', 'view_plant_details','edit_profile'],
  },
  user: {
    can: ['view_dashboard'],
  },
};

const PermissionContext = createContext();

export const usePermissions = () => {
  return useContext(PermissionContext);
};

export const PermissionProvider = ({ children, role }) => {
  const { user } = useUser(); 
    const { can } = roles[role] || { can: [] };
    const [permissionsCompany, setPermissionsCompany] = useState({
      companyPermissions: {},
      role: '',
      company_id: null,
    });
    
    useEffect(() => {
      if (user) {
        setPermissionsCompany({
          companyPermissions: user.companyPermissions || {},
          role: user.role || '',
          company_id: user.company_id || null,
        });
      }
    }, [user]);

    console.log(user,);
    console.log(user?.company_id);
    console.log(permissionsCompany);
    
    const hasPermission = (permission) => can.includes(permission) 

    const hasPermissionCompany = (permission) => {
      const { company_id, companyPermissions } = permissionsCompany;
      if (!company_id || !companyPermissions || !companyPermissions[company_id]) {
        return false;
      }
      const userPermissions = companyPermissions[company_id];
      console.log(company_id,companyPermissions[company_id]);
      
      return userPermissions.includes(permission);
    };

    return (
      <PermissionContext.Provider value={{ hasPermission, hasPermissionCompany }}>
        {children}
      </PermissionContext.Provider>
    );
  };
