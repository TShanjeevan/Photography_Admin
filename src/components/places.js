import React, { useState } from "react";
// import { Link } from "react-router-dom";
import Sidebar from "./sidebar"; // Ensure the correct path

const PlaceManagement = () => {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    image: "",
    place: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  // const [modalMessage, setModalMessage] = useState("");
  // const [modalType, setModalType] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [placeToDelete, setPlaceToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [showAddCard, setShowAddCard] = useState(false);

  const [descriptionCardData, setDescriptionCardData] = useState(null); // New state for the description card

  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [deleteConfirmation, setDeleteConfirmation] = useState(""); // State for delete confirmation
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  // State for image view pop-up
  const [isImageViewModalOpen, setIsImageViewModalOpen] = useState(false);
  const [imageToView, setImageToView] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    const { date, description, image, place } = formData;
    if (!date || !description || !place || !image) {
      setErrorMessage("Date, Description, Place, and Image are required.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    setPlaces([...places, formData]);
    setFormData({ date: "", description: "", image: "", place: "" });
    setShowAddCard(false);
    setSuccessMessage("Place added successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleEdit = (index) => {
    setFormData(places[index]);
    setEditingIndex(index);
    setShowAddCard(true);
  };

  const handleUpdate = () => {
    if (editingIndex !== null) {
      const updatedPlaces = [...places];
      updatedPlaces[editingIndex] = formData;
      setPlaces(updatedPlaces);
      setEditingIndex(null);
      setFormData({ date: "", description: "", image: "", place: "" });
      setShowAddCard(false);
      setSuccessMessage("Place updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleDelete = (index) => {
    setPlaceToDelete(places[index]);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    const updatedPlaces = places.filter((_, i) => i !== places.indexOf(placeToDelete));
    setPlaces(updatedPlaces);
    setShowDeleteModal(false);
    setDeleteConfirmation("Place deleted successfully!");
    setTimeout(() => setDeleteConfirmation(""), 3000);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const filteredPlaces = places.filter(
    ({ date, description, place }) =>
      date.toLowerCase().includes(search.toLowerCase()) ||
      description.toLowerCase().includes(search.toLowerCase()) ||
      place.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPlaces.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPlaces.slice(indexOfFirstItem, indexOfLastItem);

  // Function to open description in the card
  const handleDescriptionClick = (description) => {
    setDescriptionCardData(description); // Set the description to show in the card
  };

  // Function to close the description card
  const handleCloseDescriptionCard = () => {
    setDescriptionCardData(null); // Reset the description card data
  };

  // Function to open image view modal
  const handleViewImage = (image) => {
    setImageToView(image);
    setIsImageViewModalOpen(true);
  };

  // Function to close image view modal
  const handleCloseImageViewModal = () => {
    setIsImageViewModalOpen(false);
    setImageToView(null);
  };

  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar />

      <div className="flex-1 p-6 ml-64"> {/* Adjust the margin to the sidebar width */}
        <h1 className="text-2xl font-bold mb-4 text-black">Place management</h1>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <h3 className="text-xl font-bold mb-4">Are you sure you want to delete this place?</h3>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Yes
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="text-gray-400 px-4 py-2 rounded-md"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success, Error, and Delete Confirmation Messages */}
        {successMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-green-500 p-6 rounded-lg shadow-lg text-white max-w-sm w-full">
              <h3 className="text-lg  text-center font-bold mb-4">{successMessage}</h3>
            </div>
          </div>
        )}

        {deleteConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-green-500 p-6 rounded-lg shadow-lg text-white max-w-sm w-full">
              <h3 className="text-lg font-bold text-center mb-4">{deleteConfirmation}</h3>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-red-600 p-6 rounded-lg  shadow-lg text-white max-w-sm w-full">
              <h3 className="text-lg  text-center font-bold mb-4">{errorMessage}</h3>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="flex justify-end mb-6">
          <input
            placeholder="Search..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-400 rounded p-2 w-64"
          />
        </div>

        {/* Add Button */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setShowAddCard(true)} // Set card to true to show the modal
            className="bg-orange-400 text-white py-2 px-4 rounded hover:bg-green-500"
          >
            Add
          </button>
        </div>

        {/* Add Place Form Card as Pop-up */}
        {showAddCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto">
              <h2 className="text-xl font-semibold mb-4">
                {editingIndex !== null ? "Edit Place" : "Add Place"}
              </h2>

              <input
                placeholder="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="border border-gray-400 rounded p-2 w-full mb-4"
              />
              {/* Replace input with textarea for description */}
              <textarea
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="border border-gray-400 rounded p-2 w-full mb-4"
                rows={4} // Set the number of rows
              />
              <input
                placeholder="Place"
                type="text"
                name="place"
                value={formData.place}
                onChange={handleInputChange}
                className="border border-gray-400 rounded p-2 w-full mb-4"
              />
              <input
                type="file"
                onChange={handleImageChange}
                className="border border-gray-400 rounded p-2 w-full mb-4"
              />

              <div className="flex justify-end gap-4">
                {/* Cancel Button */}
                <button
                  onClick={() => setShowAddCard(false)} // Close the modal
                  className=" text-gray-400 py-2 px-4 rounded "
                >
                  Cancel
                </button>

                <button
                  onClick={editingIndex !== null ? handleUpdate : handleAdd}
                  className="bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-500"
                >
                  {editingIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="overflow-x-auto"> {/* Allow horizontal scrolling if table overflows */}
          <table className="table-auto w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b bg-orange-400 text-white text-left">Date</th>
                <th className="px-4 py-2 border-b bg-orange-400 text-white text-left">Description</th>
                <th className="px-4 py-2 border-b bg-orange-400 text-white text-left">Place</th>
                <th className="px-4 py-2 border-b bg-orange-400 text-white text-left">Image</th>
                <th className="px-4 py-2 border-b bg-orange-400 text-white text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((place, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-black">{place.date}</td>
                  <td className="px-4 py-2 text-black">
                    <button
                      onClick={() => handleDescriptionClick(place.description)} // Show description in card
                      className="text-blue-500 underline"
                    >
                      View
                    </button>
                  </td>
                  <td className="px-4 py-2 text-black">{place.place}</td>
                  <td className="px-4 py-2">
                    {place.image && (
                      <img
                        src={place.image}
                        alt={place.description}
                        className="w-16 h-16 object-cover rounded cursor-pointer"
                        onClick={() => handleViewImage(place.image)} // Open image view modal
                      />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-blue-400 text-white py-1 px-3 rounded hover:bg-blue-500 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center items-center gap-4">
          <button
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-orange-400 text-white hover:bg-orange-500"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span className="text-black">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages || totalPages === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-orange-400 text-white hover:bg-orange-500"
            }`}
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </div>

        {/* Description Card */}
        {descriptionCardData && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-80">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p>{descriptionCardData}</p>
              <div className="mt-4 text-center">
                <button
                  onClick={handleCloseDescriptionCard}
                  className="bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image View Modal */}
        {isImageViewModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-md max-w-2xl w-full">
              <h2 className="text-xl font-semibold mb-4">Image Preview</h2>
              <img
                src={imageToView}
                alt="Preview"
                className="w-full h-auto rounded-md"
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleCloseImageViewModal}
                  className="bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceManagement;