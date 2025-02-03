import React, { useState } from "react";
// import { Link } from "react-router-dom";
import Sidebar from "./sidebar"; // Assuming Sidebar is in the same directory

const ImageManagement = () => {
  const [imageData, setImageData] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [editingImageId] = useState(null);
  const [editedImage, setEditedImage] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [imageToEdit, setImageToEdit] = useState(null);

  const [newImageTitle, setNewImageTitle] = useState(""); // Dropdown for Image Title

  // State for image view pop-up
  const [isImageViewModalOpen, setIsImageViewModalOpen] = useState(false);
  const [imageToView, setImageToView] = useState(null);

  // Handle image file upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!newImageTitle) {
      setErrorMessage("Please select an image title.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    const imageFiles = files.map((file) => ({
      title: newImageTitle,
      url: URL.createObjectURL(file),
    }));

    setNewImages((prevImages) => [...prevImages, ...imageFiles]);
  };

  // Select/Unselect images for upload
  const handleSelectImage = (image) => {
    if (selectedImages.some((img) => img.title === image.title)) {
      setSelectedImages(selectedImages.filter((img) => img.title !== image.title));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  // Add images to imageData
  const handleAddImages = () => {
    if (selectedImages.length > 0) {
      setImageData([...imageData, ...selectedImages]);
      setSelectedImages([]);
      setNewImages([]);
      setSuccessMessage("Images added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      setErrorMessage("Please select at least one image to upload.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  // Start editing an image by clicking on the image itself
  const handleEditImage = (image) => {
    setImageToEdit(image);
    setIsEditModalOpen(true);
  };

  // Handle save for editing
  const handleSaveEdit = () => {
    if (editedImage) {
      setImageData(
        imageData.map((img) =>
          img.title === imageToEdit.title
            ? { ...img, url: editedImage }
            : img
        )
      );
    } else {
      setImageData(
        imageData.map((img) =>
          img.title === imageToEdit.title ? { ...img } : img
        )
      );
    }
    setIsEditModalOpen(false);
    setEditedImage(null);
  };

  // Handle image update
  const handleUpdate = () => {
    if (imageToEdit) {
      setImageData(
        imageData.map((img) =>
          img.title === imageToEdit.title
            ? { ...img, url: editedImage || img.url }
            : img
        )
      );
      setSuccessMessage("Image updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      setIsEditModalOpen(false);
      setEditedImage(null);
    }
  };

  // Cancel edit modal
  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditedImage(null);
  };

  // Open delete confirmation modal
  const handleDeleteImage = (title) => {
    const image = imageData.find((img) => img.title === title);
    setImageToDelete(image);
    setIsDeleteModalOpen(true);
  };

  // Confirm deletion
  const handleConfirmDelete = () => {
    setImageData(imageData.filter((image) => image.title !== imageToDelete.title));
    setIsDeleteModalOpen(false);
    setDeleteConfirmation("Image deleted successfully.");
    setTimeout(() => setDeleteConfirmation(""), 3000);
  };

  // Cancel delete action
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setImageToDelete(null);
  };

  // Handle search query
  const filteredImages = imageData.filter(
    (img) =>
      img.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate images
  const paginatedImages = filteredImages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);

  // Open image view modal
  const handleViewImage = (image) => {
    setImageToView(image);
    setIsImageViewModalOpen(true);
  };

  // Close image view modal
  const handleCloseImageViewModal = () => {
    setIsImageViewModalOpen(false);
    setImageToView(null);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Image Management Section */}
      <div className="min-h-screen bg-gray-300 p-6 w-full ml-[250px]">
        <h2 className="text-2xl font-bold text-left mb-6">Album</h2>

        {/* Image Upload Section */}
        <div className="mb-4 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <select
              value={newImageTitle}
              onChange={(e) => setNewImageTitle(e.target.value)}
              className="border border-gray-400 p-2 rounded-md"
            >
              <option value="">Select Image Title</option>
              {["Wedding", "Birthday", "Model shoot", "Nature", "Others"].map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="border border-gray-400 p-2 rounded-md"
            />
            <button
              onClick={handleAddImages}
              className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-500 transition duration-300"
            >
              Add
            </button>
          </div>

          {/* Display Uploaded Images for Multiple Selection */}
          <div className="grid grid-cols-3 gap-4">
            {newImages.map((image, index) => (
              <div
                key={index}
                className={`border p-2 rounded-md cursor-pointer ${
                  selectedImages.some((img) => img.title === image.title)
                    ? "border-orange-500 bg-orange-100"
                    : "border-gray-400"
                }`}
                onClick={() => handleSelectImage(image)}
              >
                <img
                  src={image.url}
                  alt={`Preview ${image.title}`}
                  className="w-full h-24 object-cover rounded-md"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent div's onClick
                    handleViewImage(image);
                  }}
                />
                <p className="text-center mt-2 text-sm text-gray-600">Title: {image.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="absolute top-4 right-6">
          <input
            type="text"
            placeholder="Search by Title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-orange-400 p-2 rounded-md w-2/2"
          />
        </div>

        {/* Image Table */}
        <div>
          <table className="w-full table-auto bg-white text-left">
            <thead className="bg-orange-400 text-white">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Preview</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedImages.map((image, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-4">{image.title}</td>
                  <td className="p-4">
                    {editingImageId === image.title ? (
                      <input
                        type="file"
                        onChange={(e) => setEditedImage(URL.createObjectURL(e.target.files[0]))}
                        className="border p-2 rounded-md"
                      />
                    ) : (
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-16 h-16 object-cover cursor-pointer"
                        onClick={() => handleViewImage(image)}
                      />
                    )}
                  </td>
                  <td className="p-4">
                    {editingImageId === image.title ? (
                      <>
                        <button
                          onClick={handleSaveEdit}
                          className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditImage(image)}
                          className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteImage(image.title)}
                          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <h3 className="text-xl font-bold mb-4">Are you sure you want to delete this image?</h3>
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

        {/* Image View Modal */}
        {isImageViewModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-md shadow-lg max-w-2xl w-full">
      <h3 className="text-xl font-bold mb-4">{imageToView.title}</h3>
      <img
        src={imageToView.url}
        alt={imageToView.title}
        className="w-full h-auto rounded-md"
      />
      <div className="flex justify-end mt-4">
        <button
          onClick={handleCloseImageViewModal}
          className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-500"
        >
          Close
        </button>
      </div>
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
          <span className="text-black font-medium">
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

        {/* Confirmation Message - Card Style */}
        {successMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-green-500 p-6 rounded-lg shadow-lg text-white max-w-sm w-full">
              <h3 className="text-lg text-center font-bold mb-4">{successMessage}</h3>
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

        {errorMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-red-600 p-6 rounded-lg shadow-lg text-white max-w-sm w-full">
              <h3 className="text-lg  text-center font-bold mb-4">{errorMessage}</h3>
            </div>
          </div>
        )}

        {/* Modal for Edit Confirmation */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <h3 className="text-xl font-bold mb-4">Edit Image</h3>
              <input
                type="file"
                onChange={(e) => setEditedImage(URL.createObjectURL(e.target.files[0]))}
                className="border p-2 rounded-md mb-4 w-full"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleUpdate}
                  className="bg-orange-400 text-white px-4 py-2 rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageManagement;