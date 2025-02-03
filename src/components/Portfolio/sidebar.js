import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaUserTie,
  FaCamera,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaPhone,
  FaSignOutAlt,
  FaImage,
  FaVideo,
  FaLocationArrow,
} from "react-icons/fa";

const Sidebar = () => {
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const location = useLocation(); // Get current location

  // Toggle Portfolio Submenu visibility
  const togglePortfolio = () => {
    setIsPortfolioOpen(!isPortfolioOpen);
  };

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path ? 'bg-gray-700' : '';

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-orange-400 text-white z-40">
      <div className="flex flex-col items-center py-6">
        <img
          src="/images/Admin_logo.jpg"
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <h2 className="text-lg font-semibold">Robert Grant</h2>
        <p className="text-gray-300 text-sm">Marketing Director</p>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {/* Dashboard Link */}
          <li>
            <Link
              to="/dashboard"
              className={`hover:bg-gray-700 rounded-md py-2 px-4 block flex items-center ${isActive("/dashboard")}`}
            >
              <FaHome className="mr-2" /> Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/managebooking"
              className={`hover:bg-gray-700 rounded-md py-2 px-4 block flex items-center ${isActive("/managebooking")}`}
            >
              <FaClipboardList className="mr-2" /> Manage Booking
            </Link>
          </li>
          <li>
            <Link
              to="/manage-admin"
              className={`hover:bg-gray-700 rounded-md py-2 px-4 block flex items-center ${isActive("/manage-admin")}`}
            >
              <FaUserTie className="mr-2" /> Manage Admin
            </Link>
          </li>

          {/* Manage Portfolio Menu with Submenu */}
          <li>
            <button
              onClick={togglePortfolio}
              className={`w-full flex justify-between items-center hover:bg-gray-700 rounded-md py-2 px-4 ${isActive("/portfolio")}`}
            >
              <div className="flex items-center">
                <FaCamera className="mr-2" /> <span>Manage Portfolio</span>
              </div>
              <span>{isPortfolioOpen ? "▲" : "▼"}</span>
            </button>
            {isPortfolioOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <Link
                    to="/portfolio/image-management"
                    className={`hover:bg-gray-700 rounded-md py-2 px-4 block flex items-center ${isActive("/portfolio/image-management")}`}
                  >
                    <FaImage className="mr-2" /> Image Management
                  </Link>
                </li>
                <li>
                  <Link
                    to="/portfolio/video-management"
                    className={`hover:bg-gray-700 rounded-md py-2 px-4 block flex items-center ${isActive("/portfolio/video-management")}`}
                  >
                    <FaVideo className="mr-2" /> Video Management
                  </Link>
                </li>
                <li>
                  <Link
                    to="/portfolio/event-management"
                    className={`hover:bg-gray-700 rounded-md py-2 px-4 block flex items-center ${isActive("/portfolio/event-management")}`}
                  >
                    <FaLocationArrow className="mr-2" /> Event Management
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              to="/places"
              className={`hover:bg-gray-700 rounded-md py-2 px-4 block flex items-center ${isActive("/places")}`}
            >
              <FaMapMarkerAlt className="mr-2" /> Manage Places
            </Link>
          </li>
          <li>
            <Link
              to="/manage-packages"
              className={`hover:bg-gray-700 rounded-md py-2 px-4 block flex items-center ${isActive("/manage-packages")}`}
            >
              <FaBoxOpen className="mr-2" /> Manage Packages
            </Link>
          </li>
          <li>
            <Link
              to="/ContactManagement"
              className={`hover:bg-gray-700 rounded-md py-2 px-4 block flex items-center ${isActive("/ContactManagement")}`}
            >
              <FaPhone className="mr-2" /> Manage Contact
            </Link>
          </li>
          {/* <li>
            <Link
              to="/manage-subscriber"
              className={`hover:bg-gray-700 rounded-md py-2 px-4 block flex items-center ${isActive("/manage-subscriber")}`}
            >
              <FaUsers className="mr-2" /> Manage Subscriber
            </Link>
          </li> */}
          {/* <li>
            <Link
              to="/manage-footer"
              className={`hover:bg-gray-700 rounded-md py-2 px-4 block flex items-center ${isActive("/manage-footer")}`}
            >
              <FaCopyright className="mr-2" /> Manage Footer
            </Link>
          </li> */}
          <li>
            <Link
              to="/login"
              className={` rounded-md py-2 px-4 block flex bg-red-600 items-center ${isActive("/manage-footer")}`}
            >
              <FaSignOutAlt className="mr-2" /> Log Out
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
