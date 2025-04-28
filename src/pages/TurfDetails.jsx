import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TurfDetails = () => {
  const { id } = useParams();
  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTurf = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/turfs/${id}`);
        setTurf(res.data);
      } catch (error) {
        console.error('Error fetching turf details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTurf();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!turf) {
    return <div className="text-center mt-10 text-red-500">Turf not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-10">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <img
          src={turf.photos[0] || '/default-turf.webp'}
          alt={turf.name}
          className="w-full h-80 object-cover rounded-2xl mb-6"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{turf.name}</h1>
        <p className="text-gray-600 text-lg mb-2">{turf.address}</p>
        <p className="text-gray-600 text-lg mb-2">Price: ₹{turf.price}</p>
        <p className="text-gray-600 text-lg mb-2">Phone: {turf.phoneNumber}</p>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-yellow-400 text-2xl">{turf.rating.toFixed(1)}⭐</span>
          <span className="text-gray-400">{turf.votes} votes</span>
        </div>
      </div>
    </div>
  );
};

export default TurfDetails;
