import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePermissions } from '../PermissionProvider';
import { useUser } from '../context/UserContext';

const Navbar = () => {
    const { user } = useUser();
    const { hasPermission, hasPermissionCompany } = usePermissions();
    const [isOpen, setIsOpen] = useState(false);
    const [companyId, setCompanyId] = useState(null);
  
    // console.log(user);
    
    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('user'));
        
        if (user) {
            setCompanyId(user.company_id);
        }
    }, [user]);
    
    const toggleMenu = () => setIsOpen(!isOpen);

    console.log(hasPermissionCompany('dap_menu', 'all'));
    

    return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-semibold">
            <Link to="/">MyApp</Link>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              ☰
            </button>
          </div>
          <div className={`flex space-x-4 md:flex ${isOpen ? 'block' : 'hidden'}`}>
            <Link to="/home" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
              Home
            </Link>
  
            {hasPermission('view_dashboard') && (
              <Link to="/dashboard" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                Dashboard
              </Link>
            )}
  
            {hasPermission('edit_profile') && (
              <Link to={`/edit-profile/${user.id}`} className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                Edit Profile
              </Link>
            )}

            {hasPermissionCompany('carbon_event', 'dap_menu', 'all') && (
              <Link to="/add-carbon-event" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                Carbon Event
              </Link>
            )}
  
            {hasPermissionCompany('dap_menu', 'all')  && (
              <Link to="/dap" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                DAP
              </Link>
            )}
  
            <Link to="/select-company" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
              Company
            </Link>
  
            <Link to="/logout" className="text-red-500 hover:bg-red-700 px-3 py-2 rounded">
              Logout
            </Link>
          </div>
        </div>
      </nav>
    );
};
  
export default Navbar;
