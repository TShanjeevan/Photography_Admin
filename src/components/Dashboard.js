import React, {} from "react";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar"; // Assuming Sidebar is in the same directory
import {
  FaUserTie,
  FaBell,
  FaEye,
  FaUser,
  FaRetweet,
} from "react-icons/fa";

const Dashboard = () => {
  // const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  // Toggle Portfolio Submenu visibility
  // const togglePortfolio = () => {
  //   setIsPortfolioOpen(!isPortfolioOpen);
  // };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="flex items-center justify-between bg-white shadow px-6 py-4">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            {/* Admin Logo with Link */}
            <Link to="/signup" className="flex items-center">
            <FaUserTie className="text-xl" />
            </Link>

            {/* Notification Bell Icon */}
            <div className="relative">
              <FaBell className="text-xl" />
              <span className="absolute top-0 right-0 bg-orange-400 text-white rounded-full text-xs px-2 py-1">
                {/* Notification count can go here */}
              </span>
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Stats Section with Icons */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 shadow rounded-lg text-center">
              <div className="flex justify-center items-center mb-2">
                <FaEye className="text-2xl text-gray-600 mr-2" />
              </div>
              <h3 className="text-sm font-medium">Views</h3>
              <p className="text-2xl font-bold">27.6m</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg text-center">
              <div className="flex justify-center items-center mb-2">
                <FaUser className="text-2xl text-gray-600 mr-2" />
              </div>
              <h3 className="text-sm font-medium">Followers</h3>
              <p className="text-2xl font-bold">219.3k</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg text-center">
              <div className="flex justify-center items-center mb-2">
                <FaRetweet className="text-2xl text-gray-600 mr-2" />
              </div>
              <h3 className="text-sm font-medium">Reposts</h3>
              <p className="text-2xl font-bold">1.5k</p>
            </div>
          </section>

          {/* Top Performers Section */}
          <section className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Top Performers</h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                <img
                  src="/images/valy-antonova.jpg" // Profile photo for Valy Antonova
                  alt="Valy Antonova"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">Valy Antonova</p>
                  <p className="text-gray-600 text-sm">@valyantonova</p>
                </div>
                <span className="ml-auto font-bold text-green-500">39%</span>
              </li>
              <li className="flex items-center">
                <img
                  src="/images/mark-noil.jpg" // Profile photo for Mark Noil
                  alt="Mark Noil"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">Mark Noil</p>
                  <p className="text-gray-600 text-sm">@marknoil</p>
                </div>
                <span className="ml-auto font-bold text-yellow-500">18%</span>
              </li>
              <li className="flex items-center">
                <img
                  src="/images/nenci-villy.jpg" // Profile photo for Nenci Villy
                  alt="Nenci Villy"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">Nenci Villy</p>
                  <p className="text-gray-600 text-sm">@nencivilly</p>
                </div>
                <span className="ml-auto font-bold text-blue-500">25%</span>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;