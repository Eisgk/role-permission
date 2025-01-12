import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from './context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import { usePermissions } from './PermissionProvider';

const EditProfile = () => {
  const { id } = useParams(); 
  const { user, login } = useUser();
  const [profile, setProfile] = useState(user);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { hasPermission } = usePermissions(); 

  console.log(user);
  
 
  useEffect(() => {
    if (user && user?.id === id) {
      setProfile(user); 
    }

    // console.log(user?.id);
    
    if (success) {
      alert('Save successful!');
      setSuccess(false); 
    }
  }, [id, user,success, hasPermission, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleCompanyPermissionChange = (companyId, permission) => {
    setProfile((prevProfile) => {
      const newCompanyPermissions = { ...prevProfile.companyPermissions };
      if (newCompanyPermissions[companyId]?.includes(permission)) {
        newCompanyPermissions[companyId] = newCompanyPermissions[companyId].filter((perm) => perm !== permission);
      } else {
        if (!newCompanyPermissions[companyId]) {
          newCompanyPermissions[companyId] = [];
        }
        newCompanyPermissions[companyId].push(permission);
      }
      return {
        ...prevProfile,
        companyPermissions: newCompanyPermissions,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(profile);
    setSuccess(true);
  };
  // console.log(profile);

  return (
    <div className="flex flex-col justify-center items-center mx-auto p-4 ">
      <>
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={profile?.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={profile?.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={profile?.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={profile?.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Company Permissions Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Company Permissions</h3>
          {profile?.company?.map((comp) => (
            <div key={comp.id} className="mb-2">
              <h4 className="font-semibold">{comp?.name} ({comp?.role})</h4>
              {['carbon_event', 'dap_menu', 'all']?.map((perm) => (
                <label key={perm} className="inline-flex items-center mr-2">
                  <input
                    type="checkbox"
                    checked={profile?.companyPermissions[comp.id]?.includes(perm) || false}
                    onChange={() => handleCompanyPermissionChange(comp?.id, perm)}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{perm}</span>
                </label>
              ))}
            </div>
          ))}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
      </>

      
    </div>
  );
};

export default EditProfile;
