import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setUser(res.data);
      setFormData({
        username: res.data.username,
        email: res.data.email,
        phoneNumber: res.data.phoneNumber
      });
    })
    .catch(err => {
      const msg = err.response?.data?.msg || "Failed to fetch profile";
      setError(msg);
    });
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/update",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setUser(res.data);
      setShowModal(false);
    } catch (err) {
      alert(err.response?.data?.msg || "Update failed");
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50 text-red-600 text-xl font-semibold">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-xl">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-5rem)] bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Your Profile</h2>
        <div className="space-y-4 text-gray-700 text-lg mb-4">
          <div><span className="font-semibold">Username:</span> {user.username}</div>
          <div><span className="font-semibold">Email:</span> {user.email}</div>
          <div><span className="font-semibold">Phone Number:</span> {user.phoneNumber}</div>
          <div>
            <span className="font-semibold">Email Verified:</span>{" "}
            <span className={user.isVerified ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
              {user.isVerified ? "Yes" : "No"}
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Edit Your Profile
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <h3 className="text-2xl font-bold mb-4 text-center text-indigo-600">Edit Profile</h3>

            <input
              type="text"
              name="username"
              placeholder={user.username}
              value={formData.username}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
            />
            <input
              type="email"
              name="email"
              placeholder={user.email}
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder={user.phoneNumber}
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Modify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
