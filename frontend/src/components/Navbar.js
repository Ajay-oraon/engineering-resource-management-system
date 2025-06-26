import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow mb-4 p-4 flex justify-between items-center overflow-x-auto">
      <Link to="/" className="font-bold text-xl text-blue-600">
        Resource System
      </Link>
      <div>
        {user ? (
          <>
            <Link to="/profile" className="mr-4 btn-secondary">
              Profile
            </Link>
            <span className="mr-4">
              Hi, {user.name} ({user.role})
            </span>
            <button onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn-primary">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
