import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePermissions } from "./PermissionProvider";
import { useNavigate } from 'react-router-dom';
import { useUser } from "./context/UserContext";
import { HasAccess } from "@permify/react-role";

function Home() {
  const { hasPermission } = usePermissions();
  const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem('user'));
  // const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const { user } = useUser(); // Get user from context

  // console.log(user);
  

  useEffect(() => {
    if (!user) {
      navigate('/login'); 
      return;
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>; 
  }
  

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <h1 className="text-2xl">Welcome,{user.name} ( {user.role} )</h1> 

    <div className="flex gap-16"> 
      {hasPermission('edit_dashboard') && (
        <div className="my-14 border-solid border-2 border-indigo-600 p-4">
          test edit dashboard
        </div>
      )}

      {hasPermission('edit_plant_details') && (
        <div className="my-14 border-solid border-2 border-indigo-600 p-4">
          test edit plant details
        </div>
      )}
    </div>

      <div className="flex gap-16">
      {hasPermission('view_dashboard') && (
        <div className="my-14 border-double border-4 border-green-800 p-4">
          test view dashboard
        </div>
      )}
      {hasPermission('view_plant_details') && (
        <div className="my-14 border-double border-4 border-green-800 p-4">
          test view plant details
        </div>
      )}
      </div>

      {hasPermission('view_dashboard')&&(
      <div className="my-16 border-dashed border-2 border-red-600 p-4">
        <p>Additional content available to all logged-in users.</p>
        <div className="flex justify-between my-4 gap-4">
          <div >
            <img
              src="https://tecdn.b-cdn.net/img/new/standard/city/047.jpg"
              className="h-24 max-w-full rounded-lg"
              alt=""
            />
          </div>
          <div className="mb-4">
            <img
              src="https://mdbootstrap.com//img/Photos/Square/1.jpg"
              className="h-24 max-w-full rounded-full"
              alt=""
            />
          </div>
          <div className="mb-4">
            <img
              src="https://tecdn.b-cdn.net/img/new/standard/city/044.jpg"
              className="h-24 max-w-full rounded-full"
              alt=""
            />
          </div>
        </div>
      </div>
      )}

    </div>
  );
}

export default Home;
