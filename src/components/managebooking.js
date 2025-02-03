import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./sidebar";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const itemsPerPage = 8; // Number of rows per page
  const [data, setData] = useState([
    // Sample data
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      country: "USA",
      message: "Inquiry about the product.",
      status: "Waiting",
      purpose: ["Photography", "Makeup", "Car"],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "987-654-3210",
      country: "Canada",
      message: "Need more details about the service.",
      status: "Finished",
      purpose: ["Car"],
    },
    {
      id: 3,
      name: "Harper King",
      email: "harper.k@example.com",
      phone: "567-890-1234",
      country: "Norway",
      message: "Feedback on customer service.",
      status: "Waiting",
      purpose: ["Makeup"],
    },
    // Add more sample data as needed
  ]);

  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [purposeDropdownOpen, setPurposeDropdownOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [purposeFilters, setPurposeFilters] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedSender, setSelectedSender] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Added state for success message

  const countryDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);
  const purposeDropdownRef = useRef(null);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCountryFilter = (country) => {
    setCountryFilter(country);
    setCountryDropdownOpen(false);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setStatusDropdownOpen(false);
  };

  const handlePurposeFilter = (purpose) => {
    setPurposeFilters((prevFilters) =>
      prevFilters.includes(purpose)
        ? prevFilters.filter((filter) => filter !== purpose)
        : [...prevFilters, purpose]
    );
    setPurposeDropdownOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setCountryDropdownOpen(false);
      }
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target)
      ) {
        setStatusDropdownOpen(false);
      }
      if (
        purposeDropdownRef.current &&
        !purposeDropdownRef.current.contains(event.target)
      ) {
        setPurposeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Updated filter logic to include ID, Name, and Email
  const currentData = data
    .filter((item) => {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      return (
        item.id.toString().includes(lowercasedSearchTerm) || // Filter by ID
        item.name.toLowerCase().includes(lowercasedSearchTerm) || // Filter by Name
        item.email.toLowerCase().includes(lowercasedSearchTerm) // Filter by Email
      );
    })
    .filter((item) => (statusFilter ? item.status === statusFilter : true))
    .filter((item) => {
      if (purposeFilters.length === 0) return true;
      return purposeFilters.some((purpose) => item.purpose.includes(purpose)); // Updated logic
    })
    .filter((item) => (countryFilter ? item.country === countryFilter : true))
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    data
      .filter((item) => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return (
          item.id.toString().includes(lowercasedSearchTerm) ||
          item.name.toLowerCase().includes(lowercasedSearchTerm) ||
          item.email.toLowerCase().includes(lowercasedSearchTerm)
        );
      })
      .filter((item) => (statusFilter ? item.status === statusFilter : true))
      .filter((item) => {
        if (purposeFilters.length === 0) return true;
        return purposeFilters.some((purpose) => item.purpose.includes(purpose)); // Updated logic
      })
      .filter((item) => (countryFilter ? item.country === countryFilter : true)).length / itemsPerPage
  );

  const handleViewMessage = (name, message) => {
    setSelectedSender(name);
    setSelectedMessage(message);
  };

  const closeMessageModal = () => {
    setSelectedSender("");
    setSelectedMessage(null);
  };

  const handleStatusChange = (item, e) => {
    setData((prevData) =>
      prevData.map((dataItem) =>
        dataItem.id === item.id
          ? { ...dataItem, status: e.target.value }
          : dataItem
      )
    );
    setShowSuccessMessage(true); // Show success message when status is updated
  
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };
  

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      <div className={`min-h-screen bg-gray-300 p-6 flex-1 ${isSidebarOpen ? "ml-64" : "ml-0"} transition-all`}>
        {/* Button to toggle sidebar */}
        <button
          onClick={handleSidebarToggle}
          className="lg:hidden fixed top-5 left-5 p-2 bg-orange-400 text-white rounded-md shadow-lg"
        >
          {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>

        {/* Heading and Search Input */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">Manage booking</h1>
          <input
            type="text"
            placeholder="Search by ID, Name, or Email"
            className="w-64 p-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full table-auto text-left">
            <thead className="bg-orange-400 text-white">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4 relative">
                  Country
                  <button
                    onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                    aria-label="Toggle country dropdown"
                    aria-expanded={countryDropdownOpen}
                  >
                    &#9660;
                  </button>
                  {countryDropdownOpen && (
                    <div
                      ref={countryDropdownRef}
                      className="absolute bg-white text-black shadow-lg rounded-lg p-2 mt-1 border border-gray-200 z-10"
                    >
                      <div
                        onClick={() => handleCountryFilter("USA")}
                        className="p-2 hover:bg-orange-400 hover:text-white rounded-md cursor-pointer"
                      >
                        USA
                      </div>
                      <div
                        onClick={() => handleCountryFilter("Canada")}
                        className="p-2 hover:bg-orange-400 hover:text-white rounded-md cursor-pointer"
                      >
                        Canada
                      </div>
                      <div
                        onClick={() => handleCountryFilter("Norway")}
                        className="p-2 hover:bg-orange-400 hover:text-white rounded-md cursor-pointer"
                      >
                        Norway
                      </div>
                    </div>
                  )}
                </th>
                <th className="p-4 relative">
                  Purpose
                  <button
                    onClick={() => setPurposeDropdownOpen(!purposeDropdownOpen)}
                    aria-label="Toggle purpose dropdown"
                    aria-expanded={purposeDropdownOpen}
                  >
                    &#9660;
                  </button>
                  {purposeDropdownOpen && (
                    <div
                      ref={purposeDropdownRef}
                      className="absolute bg-white text-black shadow-lg rounded-lg p-2 mt-1 border border-gray-200 z-10"
                    >
                      <label className="flex items-center gap-2 p-2">
                        <input
                          type="checkbox"
                          checked={purposeFilters.includes("Photography")}
                          onChange={() => handlePurposeFilter("Photography")}
                        />
                        Photography
                      </label>
                      <label className="flex items-center gap-2 p-2">
                        <input
                          type="checkbox"
                          checked={purposeFilters.includes("Car")}
                          onChange={() => handlePurposeFilter("Car")}
                        />
                        Car
                      </label>
                      <label className="flex items-center gap-2 p-2">
                        <input
                          type="checkbox"
                          checked={purposeFilters.includes("Makeup")}
                          onChange={() => handlePurposeFilter("Makeup")}
                        />
                        Makeup
                      </label>
                    </div>
                  )}
                </th>
                <th className="p-4">Message</th>
                <th className="p-4 relative">
                  Booking Status
                  <button
                    onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                    aria-label="Toggle status dropdown"
                    aria-expanded={statusDropdownOpen}
                  >
                    &#9660;
                  </button>
                  {statusDropdownOpen && (
                    <div
                      ref={statusDropdownRef}
                      className="absolute bg-white text-black shadow-lg rounded-lg p-2 mt-1 border border-gray-200 z-10"
                    >
                      <div
                        onClick={() => handleStatusFilter("Waiting")}
                        className="p-2 hover:bg-orange-400 hover:text-white rounded-md cursor-pointer"
                      >
                        Waiting
                      </div>
                      <div
                        onClick={() => handleStatusFilter("Finished")}
                        className="p-2 hover:bg-orange-400 hover:text-white rounded-md cursor-pointer"
                      >
                        Finished
                      </div>
                      <div
                        onClick={() => handleStatusFilter("")}
                        className="p-2 hover:bg-orange-400 hover:text-white rounded-md cursor-pointer"
                      >
                        All
                      </div>
                    </div>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id} className="border-b last:border-none">
                  <td className="p-4 text-black">{item.id}</td>
                  <td className="p-4 text-black">{item.name}</td>
                  <td className="p-4 text-blue-500 underline">
                    <a href={`mailto:${item.email}`}>{item.email}</a>
                  </td>
                  <td className="p-4 text-blue-500 underline">
                    <a href={`tel:${item.phone}`}>{item.phone}</a>
                  </td>
                  <td className="p-4 text-black">{item.country}</td>
                  <td className="p-4 text-black">
                    {item.purpose.join(", ")}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleViewMessage("Message of " + item.name, item.message)}
                      className="text-blue-500 underline hover:text-orange-500"
                    >
                      View
                    </button>
                  </td>
                  <td className="p-4">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item, e)}
                      className={`p-2 rounded-md border border-gray-400 ${
                        item.status === "Finished" ? "bg-green-500" : "bg-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-orange-400`}
                    >
                      <option value="Waiting">Waiting</option>
                      <option value="Finished">Finished</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Success Modal */}
        {showSuccessMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-green-500 p-6 rounded-lg  text-center shadow-lg text-white max-w-sm w-full">
              <p className="mt-2">Booking status updated successfully.</p>
              
            </div>
          </div>
        )}
         {/* {showSuccessMessage&& (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-green-500 p-6 rounded-lg shadow-lg text-white max-w-sm w-full">
              <h3 className="text-lg font-bold text-center mb-4">{successMessage}</h3>
            </div>
          </div>
        )} */}


        {/* Modal for viewing messages */}
        {selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">{selectedSender}</h2>
              <p className="mb-4">{selectedMessage}</p>
              <button
                onClick={closeMessageModal}
                className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-4 flex justify-center items-center gap-4">
          <button
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-orange-400 text-white hover:bg-orange-500"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span className="text-black">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-orange-400 text-white hover:bg-orange-500"
            }`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;