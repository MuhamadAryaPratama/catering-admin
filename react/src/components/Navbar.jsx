import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for validation
import axiosClient from "../axiosClient";
import Logo from "../assets/logo.png";

export default function Navbar({ toggleSidebar }) {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.log("No token found, user not logged in.");
      return;
    }

    try {
      const response = await axiosClient.post("/auth/me");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("access_token");
        setUser(null);
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axiosClient.post("/auth/logout");
      localStorage.removeItem("access_token");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchUser();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [fetchUser]);

  return (
    <div className="bg-gray-100 w-full">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-16" />
            </Link>

            <div className="flex items-center space-x-4">
              {/* User Name (Visible on Mobile) */}
              <div className="sm:hidden text-gray-800 text-lg font-semibold">
                {user && <span>{user.name}</span>}
              </div>

              {/* Toggle Sidebar Button (Visible on Mobile Only) */}
              <button
                onClick={toggleSidebar}
                className="sm:hidden p-2 bg-blue-500 text-white rounded-md shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>

            {/* User Dropdown */}
            <div className="hidden sm:flex sm:items-center">
              {user ? (
                <div className="relative flex items-center" ref={dropdownRef}>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-gray-800 text-lg font-semibold hover:text-purple-600"
                  >
                    {user.name}
                  </button>
                  {isMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48 z-50">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-800 text-sm font-semibold hover:bg-gray-100"
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-800 text-lg font-semibold hover:text-purple-600"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Define prop types
Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired, // Ensure toggleSidebar is a required function
};
