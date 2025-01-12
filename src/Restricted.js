import React from "react";
import { Link } from "react-router-dom";

const Restricted = () => {
  return (
    <div className="flex flex-col justify-center items-center mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Permission Required</h2>
      <p className="text-gray-700">
        You need permissions to edit this profile.
      </p>
      <Link to="/home" className="mt-4 text-red-500 font-semibold text-xl">
        Go Back
      </Link>
    </div>
  );
};

export default Restricted;
