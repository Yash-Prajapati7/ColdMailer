import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Mail } from "lucide-react";
import axios from "axios";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkAuth = async (isMounted) => {
    try {
      const response = await axios.get("https://coldmailer-aw4c.onrender.com/v1/auth/status", { withCredentials: true });
      if (isMounted.current) {
        setIsLoggedIn(response.data.isAuthenticated);
      }
    } catch (error) {
      if (isMounted.current) {
        setIsLoggedIn(false);
      }
    }
  };
  
  useEffect(() => {
    let isMounted = { current: true };
    checkAuth(isMounted);
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("https://coldmailer-aw4c.onrender.com/v1/auth/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinkClasses = ({ isActive }) =>
    `relative font-medium text-sm tracking-wide transition-colors duration-300 ${
      isActive ? "text-lavender-600" : "text-slate-600 hover:text-lavender-600"
    } group`;

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-lavender-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
              <Mail size={20} />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 group-hover:text-lavender-600 transition-colors">
              ColdMailer
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={navLinkClasses}>
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lavender-600 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
            <NavLink to="/about" className={navLinkClasses}>
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lavender-600 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
            <NavLink to="/contact" className={navLinkClasses}>
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lavender-600 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-600 hover:text-lavender-600 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 text-sm font-medium text-white bg-lavender-600 rounded-full hover:bg-lavender-700 transition-all duration-300 hover:shadow-lg hover:shadow-lavender-500/30 hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}