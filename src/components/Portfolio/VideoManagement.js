import React, { useState } from "react";
// import { Link } from "react-router-dom";
import Sidebar from "./sidebar"; // Ensure the correct path

const VideoManagement = () => {
  const [videoData, setVideoData] = useState([
    { id: 1, youtubeLink: "https://www.youtube.com/watch?v=xxx" },
    { id: 2, youtubeLink: "https://www.youtube.com/watch?v=yyy" },
    { id: 3, youtubeLink: "https://www.youtube.com/watch?v=zzz" },
    { id: 4, youtubeLink: "https://www.youtube.com/watch?v=aaa" },
    { id: 5, youtubeLink: "https://www.youtube.com/watch?v=bbb" },
    { id: 6, youtubeLink: "https://www.youtube.com/watch?v=ccc" },
  ]);

  const [newVideo, setNewVideo] = useState({ youtubeLink: "" });
  const [message, setMessage] = useState("");
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [setShowEditModal] = useState(false); // State for showing edit modal
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const videosPerPage = 3;
  const totalPages = Math.ceil(videoData.length / videosPerPage);

  const handleCreateVideo = () => {
    if (newVideo.youtubeLink) {
      setVideoData([...videoData, { id: videoData.length + 1, ...newVideo }]);
      setNewVideo({ youtubeLink: "" });
      setMessage("Video added successfully.");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Please fill in the YouTube link.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleEditVideo = (video) => {
    setEditingVideoId(video.id);
    setNewVideo({ youtubeLink: video.youtubeLink });
    setShowEditModal(true); // Show the edit modal
  };

  const handleSaveEdit = () => {
    if (newVideo.youtubeLink) {
      setVideoData((prev) =>
        prev.map((video) =>
          video.id === editingVideoId
            ? { ...video, youtubeLink: newVideo.youtubeLink }
            : video
        )
      );
      setShowEditModal(false); // Close modal after saving
      setEditingVideoId(null); // Clear editing state
      setNewVideo({ youtubeLink: "" });
      setMessage("Video updated successfully.");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Please fill in the YouTube link.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false); // Close modal on cancel
    setEditingVideoId(null);
    setNewVideo({ youtubeLink: "" });
  };

  const handleDeleteVideo = (video) => {
    setVideoToDelete(video);
    setShowDeleteModal(true);
  };

  const confirmDeleteVideo = () => {
    setVideoData(videoData.filter((video) => video.id !== videoToDelete.id));
    setShowDeleteModal(false);
    setMessage("Video deleted successfully.");
    setTimeout(() => setMessage(""), 3000);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setVideoToDelete(null);
  };

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const filteredVideos = videoData.filter((video) =>
    video.id.toString().includes(searchTerm)
  );
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  return (
    <div className="min-h-screen bg-gray-300 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64">
        <h2 className="text-2xl font-bold mb-6">Video management</h2>

        {message && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div
              className={`p-6 rounded-lg text-white max-w-sm w-full ${
                message === "Please fill in the YouTube link."
                  ? "bg-red-600"
                  : "bg-green-600"
              }`}
            >
              <h3 className="text-lg font-bold text-center">{message}</h3>
            </div>
          </div>
        )}

        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search by ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-md border border-gray-400 w-60"
          />
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="YouTube Link"
            value={newVideo.youtubeLink}
            onChange={(e) =>
              setNewVideo({ ...newVideo, youtubeLink: e.target.value })
            }
            className="p-2 rounded-md border border-gray-400"
          />
          <button
            onClick={editingVideoId ? handleSaveEdit : handleCreateVideo}
            className="bg-orange-400 text-white px-4 py-2 w-20 rounded-md"
          >
            {editingVideoId ? "Save" : "Add"}
          </button>
          {editingVideoId && (
            <button
              onClick={handleCancelEdit}
              className="bg-gray-400 text-white px-4 py-2 w-20 rounded-md"
            >
              Cancel
            </button>
          )}
        </div>

        <table className="w-full table-auto text-left mt-4 bg-white rounded-lg shadow-md">
          <thead className="bg-orange-400 text-white">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">YouTube Link</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentVideos.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No videos found.
                </td>
              </tr>
            ) : (
              currentVideos.map((video) => (
                <tr key={video.id} className="border-b hover:bg-gray-100">
                  <td className="p-4">{video.id}</td>
                  <td className="p-4">{video.youtubeLink}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleEditVideo(video)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteVideo(video)}
                      className="bg-red-400 text-white px-2 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

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
          <span>
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

        {/* Edit Modal */}
        {editingVideoId && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-8 rounded-lg max-w-md w-full">
      <h3 className="text-lg font-bold">Edit Video</h3>
      <div className="mb-4">
        <input
          type="text"
          placeholder="YouTube Link"
          value={newVideo.youtubeLink}
          onChange={(e) =>
            setNewVideo({ ...newVideo, youtubeLink: e.target.value })
          }
          className="p-2 rounded-md border border-gray-400 w-full"
        />
      </div>
      <div className="flex justify-end gap-4 mt-4">
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
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-bold">
                Are you sure you want to delete this video?
              </h3>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={confirmDeleteVideo}
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
                <button
                  onClick={cancelDelete}
                  className="bg-gray-400 px-4 py-2 rounded-md"
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

export default VideoManagement;
