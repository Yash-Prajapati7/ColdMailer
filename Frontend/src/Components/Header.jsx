import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = async (isMounted) => {
    try {
      const response = await axios.get("/v1/auth/status", { withCredentials: true }); // Added withCredentials: true
      if (isMounted.current) {
        setIsLoggedIn(response.data.isAuthenticated);
      }
    } catch (error) {
      if (isMounted.current) {
        setIsLoggedIn(false); // If request fails, assume not logged in
      }
    }
  };
  
  useEffect(() => {
    let isMounted = { current: true }; // This ensures cleanup
    checkAuth(isMounted);
  
    return () => {
      isMounted.current = false; // Prevents setting state on unmounted component
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/v1/auth/logout", {}, { withCredentials: true }); // Added withCredentials: true
      setIsLoggedIn(false);
      window.location.reload(); // Refresh page to reflect logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-asterosNavy border-white px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <h1 className="logo">Cold Mailer</h1>
          </Link>
          <div className="flex items-center lg:order-2">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:bg-azure focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-customOrange" : "text-white"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-customOrange lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-customOrange" : "text-white"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-customOrange lg:p-0`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-customOrange" : "text-white"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-customOrange lg:p-0`
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/privacy"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-customOrange" : "text-white"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-customOrange lg:p-0`
                  }
                >
                  Privacy
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}