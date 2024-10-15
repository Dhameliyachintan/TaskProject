import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./form/Authprovider";

const Sidebar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Successfully logged out!");
  };

  return (
    <div className="fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg p-4 transform transition-transform duration-300">
      <h2 className="text-xl font-bold mb-4">Task Management</h2>
      <nav className="mt-6">
        <ul className="space-y-2">
          <li>
            <Link
              to="/taskform"
              className="block p-2 rounded hover:bg-gray-300"
            >
              Taskfrom
            </Link>
          </li>
          {!login ? (
            <li>
              <Link
                to="/login"
                className="block p-2 rounded hover:bg-gray-300"
              >
                Login
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="block w-full p-2 text-center rounded hover:bg-gray-300"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
