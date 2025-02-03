import React, { useState } from "react";
import Sidebar from "./sidebar"; // Assuming Sidebar is in the same directory

const ContactManagement = () => {
  const [formData, setFormData] = useState({
    contactType: '',
    contactInfo: '',
    phone: '',
    email: '',
    // clock: '',
    // countryCode: '+94', // Default country code (example: USA)
  });

  const [contactList, setContactList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;

  const countryCodes = [
    { code: '+94', country: 'Sri-lanka' },
    { code: '+1', country: 'USA' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+61', country: 'Australia' },
    // Add more country codes as needed
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContactTypeChange = (e) => {
    const { value } = e.target;
    setFormData({
      contactType: value,
      contactInfo: '', // Reset contact info when changing type
      phone: '', // Reset phone number
      email: '', // Reset email
      clock: '', // Reset clock
      countryCode: '+1', // Reset country code
    });
  };

  const handleCreateContact = () => {
    const { contactType, contactInfo, phone, email } = formData;
  
    if (!contactType || ((contactType === "whatsapp" || contactType === "instagram" || contactType === "facebook") && !contactInfo)) {
      setErrorMessage("Please fill all fields for the contact method.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
  
    // Unified validation for phone and WhatsApp (same phone number validation)
    if ((contactType === 'phone' || contactType === 'whatsapp') && phone && !/^\d{10}$/.test(phone)) {
      setErrorMessage("Phone number must be exactly 10 digits.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
  
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
  
    if (isEditing) {
      setContactList((prevList) =>
        prevList.map((contact) =>
          contact.id === editId ? { ...formData, id: editId } : contact
        )
      );
      setIsEditing(false);
      setEditId(null);
      setSuccessMessage("Contact updated successfully.");
    } else {
      setContactList([
        ...contactList,
        { ...formData, id: contactList.length + 1 }
      ]);
      setSuccessMessage("Contact added successfully.");
    }
  
    setFormData({ contactType: '', contactInfo: '', phone: '', email: '', clock: '', countryCode: '+1' });
    setTimeout(() => setSuccessMessage(""), 3000);
  };
  

  const handleEditContact = (id) => {
    const contactToEdit = contactList.find((contact) => contact.id === id);
    setFormData(contactToEdit);
    setIsEditing(true);
    setEditId(id);
  };

  const openDeleteModal = (id) => {
    const contact = contactList.find((contact) => contact.id === id);
    setContactToDelete(contact);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteContact = () => {
    setContactList((prevList) => prevList.filter((contact) => contact.id !== contactToDelete.id));
    setIsDeleteModalOpen(false);
    setDeleteConfirmation("Contact deleted successfully.");
    setTimeout(() => setDeleteConfirmation(""), 3000);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setContactToDelete(null);
  };

  const filteredContacts = contactList.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const totalPages = Math.ceil(contactList.length / eventsPerPage);

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-screen bg-gray-300 p-6 flex flex-col w-full ml-[240px]">
        <h2 className="text-2xl font-bold text-left mb-4">Contact management</h2>

        {/* Success and Error Messages */}
        {successMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-green-500 p-6 rounded-lg shadow-lg text-white max-w-sm w-full">
              <h3 className="text-lg  text-center font-bold mb-4">{successMessage}</h3>
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

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-lg text-center font-bold mb-4">Are you sure you want to delete this contact?</h3>
              <div className="flex justify-end gap-4">
                <button
                  onClick={cancelDelete}
                  className="bg-gray-500 text-white rounded-md px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteContact}
                  className="bg-red-500 text-white rounded-md px-4 py-2"
                >
                  Delete
                </button>
              </div>
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

        {/* Contact Add Form */}
        <div className="mb-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select
            name="contactType"
            value={formData.contactType}
            onChange={handleContactTypeChange}
            className="p-2 text-sm rounded-md border border-gray-400 w-full"
          >
            <option value="">Select contact method</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="location">Location</option>
            <option value="phone">Phone Number</option>
            <option value="email">Email</option>
            <option value="clock">Available Time</option>
          </select>

          {(formData.contactType === 'phone' || formData.contactType === 'whatsapp') && (
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="p-2 text-sm rounded-md border border-gray-400"
              >
                {countryCodes.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.code} - {option.country}
                  </option>
                ))}
              </select>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit phone number"
                className="p-2 text-sm rounded-md border border-gray-400 w-full"
              />
            </div>
          )}

          {formData.contactType === 'email' && (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="p-2 text-sm rounded-md border border-gray-400 w-full"
            />
          )}

          {formData.contactType === 'clock' && (
            <input
              type="time"
              name="clock"
              value={formData.clock}
              onChange={handleChange}
              className="p-2 text-sm rounded-md  border border-gray-400 w-full"
            />
          )}

          {(formData.contactType === 'location' || formData.contactType === 'facebook' || formData.contactType === 'instagram') && (
            <input
              type="text"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              placeholder={`Enter ${formData.contactType} info`}
              className="p-2 text-sm rounded-md border border-gray-400 w-full"
            />
          )}

          <button
            onClick={handleCreateContact}
            className="bg-orange-400 text-white rounded-md text-base text-center w-20"
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </div>

        {/* Contact List */}
        <table className="w-full table-auto text-left mt-4 bg-white rounded-md shadow-md text-base">
          <thead className="bg-orange-400 text-white">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Contact Type</th>
              <th className="p-2">Contact Info</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="border-b">
                <td className="p-2">{contact.id}</td>
                <td className="p-2">{contact.contactType}</td>
                <td className="p-2">
                  {contact.contactType === 'phone'
                    ? `${contact.countryCode} ${contact.phone}`
                    : contact.contactInfo || contact.email || contact.clock}
                </td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => handleEditContact(contact.id)}
                    className="bg-blue-500 text-white rounded-md text-base px-3 py-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(contact.id)}
                    className="bg-red-500 text-white rounded-md text-base px-3 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-3 flex justify-center items-center gap-3 text-base">
          <button
            className={`px-3 py-2 rounded-md ${currentPage === 1 ? "bg-gray-400 text-white cursor-not-allowed" : "bg-orange-400 text-white hover:bg-orange-500"}`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-3 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-400 text-white cursor-not-allowed" : "bg-orange-400 text-white hover:bg-orange-500"}`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h3 className="text-lg text-center font-bold mb-4">Edit Contact</h3>
      <div className="mb-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <select
          name="contactType"
          value={formData.contactType}
          onChange={handleContactTypeChange}
          className="p-2 text-sm rounded-md border border-gray-400 w-full"
        >
          <option value="">Select contact method</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="location">Location</option>
          <option value="phone">Phone Number</option>
          <option value="email">Email</option>
          <option value="clock">Available Time</option>
        </select>

        {(formData.contactType === 'phone' || formData.contactType === 'whatsapp') && (
          <div className="flex gap-2">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="p-2 text-sm rounded-md border border-gray-400"
            >
              {countryCodes.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.code} - {option.country}
                </option>
              ))}
            </select>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10-digit phone number"
              className="p-2 text-sm rounded-md border border-gray-400 w-full"
            />
          </div>
        )}

        {formData.contactType === 'email' && (
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="p-2 text-sm rounded-md border border-gray-400 w-full"
          />
        )}

        {formData.contactType === 'clock' && (
          <input
            type="time"
            name="clock"
            value={formData.clock}
            onChange={handleChange}
            className="p-2 text-sm rounded-md  border border-gray-400 w-full"
          />
        )}

        {(formData.contactType === 'location' || formData.contactType === 'facebook' || formData.contactType === 'instagram') && (
          <input
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            placeholder={`Enter ${formData.contactType} info`}
            className="p-2 text-sm rounded-md border border-gray-400 w-full"
          />
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleCreateContact}
          className="bg-orange-400 text-white rounded-md text-base text-center w-20"
        >
          Update
        </button>
        <button
          onClick={() => {
            setIsEditing(false);
            setFormData({
              contactType: '',
              contactInfo: '',
              phone: '',
              email: '',
              clock: '',
              countryCode: '+1',
            });
          }}
          className="bg-gray-400 text-white rounded-md text-base text-center w-20"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ContactManagement;
