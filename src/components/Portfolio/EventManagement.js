import React, { useState } from "react";
import Sidebar from "./sidebar"; // Assuming Sidebar is in the same directory

const EventManagement = () => {
  const [eventData, setEventData] = useState([
    { id: 1, name: "Event 1" },
    { id: 2, name: "Event 2" },
    { id: 3, name: "Event 3" },
  ]);

  const [newEvent, setNewEvent] = useState({ name: "" });
  const [editEvent, setEditEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const eventsPerPage = 5;

  const handleCreateEvent = () => {
    if (newEvent.name) {
      setEventData([...eventData, { id: eventData.length + 1, ...newEvent }]);
      setNewEvent({ name: "" });
      setSuccessMessage("Event added successfully.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      setErrorMessage("Please fill all fields for the event.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleEditEvent = (event) => {
    setEditEvent(event);
    setNewEvent({ name: event.name });
  };

  const handleSaveEdit = () => {
    if (newEvent.name) {
      setEventData((prevData) =>
        prevData.map((event) =>
          event.id === editEvent.id ? { ...event, ...newEvent } : event
        )
      );
      setNewEvent({ name: "" });
      setSuccessMessage("Event updated successfully.");
      setTimeout(() => setSuccessMessage(""), 3000);
      setEditEvent(null);
    } else {
      setErrorMessage("Please fill all fields for the event.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleCancelEdit = () => {
    setEditEvent(null);
    setNewEvent({ name: "" });
  };

  const handleDeleteEvent = (event) => {
    setVideoToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteEvent = () => {
    setEventData(eventData.filter((event) => event.id !== videoToDelete.id));
    setIsDeleteModalOpen(false);
    setDeleteConfirmation("Event deleted successfully.");
    setTimeout(() => setDeleteConfirmation(""), 3000);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setVideoToDelete(null);
  };

  const filteredEvents = eventData.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-screen bg-gray-300 p-6 flex flex-col w-full ml-[240px]">
        <h2 className="text-2xl font-bold text-left mb-4">Event management</h2>

        {successMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-green-500 p-6 rounded-lg shadow-lg text-white max-w-sm w-full">
              <h3 className="text-lg font-bold text-center mb-4">{successMessage}</h3>
            </div>
          </div>
        )}

        {deleteConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-green-500 p-6 rounded-lg shadow-lg text-white max-w-sm w-full">
              <h3 className="text-lg text-center font-bold mb-4">{deleteConfirmation}</h3>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-red-600 p-6 rounded-lg shadow-lg text-white max-w-sm w-full">
              <h3 className="text-lg text-center font-bold mb-4">{errorMessage}</h3>
            </div>
          </div>
        )}

        <div className="mb-3 flex justify-end">
          <input
            type="text"
            placeholder="Search Events"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 text-sm rounded-md border border-gray-400 w-full sm:w-60"
          />
        </div>

        <div className="mb-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Event Name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            className="p-2 text-sm rounded-md border border-gray-400 w-full"
          />

          <div className="flex gap-2">
            <button
              onClick={editEvent ? handleSaveEdit : handleCreateEvent}
              className="bg-orange-400 text-white rounded-md text-base text-center px-3 py-2 text-"
            >
              {editEvent ? "Save" : "Add"}
            </button>
            {editEvent && (
              <button
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white rounded-md text-base text-center px-3 py-2 w-20"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <table className="w-full table-auto text-left mt-4 bg-white rounded-md shadow-md text-base">
          <thead className="bg-orange-400 text-white">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.map((event) => (
              <tr key={event.id} className="border-b">
                <td className="p-2">{event.id}</td>
                <td className="p-2">{event.name}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => handleEditEvent(event)}
                    className="bg-blue-500 text-white rounded-md text-base px-3 py-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event)}
                    className="bg-red-500 text-white rounded-md text-base px-3 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-3 flex justify-center items-center gap-3 text-base">
          <button
            className={`px-3 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-orange-400 text-white hover:bg-orange-500"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-3 py-2 rounded-md ${
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

        {/* Edit Modal Popup */}
        {editEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-80">
              <h3 className="text-xl font-bold mb-4">Edit Event</h3>
              <input
                type="text"
                value={newEvent.name}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, name: e.target.value })
                }
                className="p-2 rounded-md border border-gray-400 w-full mb-4"
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleSaveEdit}
                  className="bg-orange-400 text-white px-4 py-2 rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <h3 className="text-xl font-bold mb-4">
                Are you sure you want to delete this event?
              </h3>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={confirmDeleteEvent}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Yes
                </button>
                <button
                  onClick={cancelDelete}
                  className="text-gray-400 px-4 py-2 rounded-md"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventManagement;
