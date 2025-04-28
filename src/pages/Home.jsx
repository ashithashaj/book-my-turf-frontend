import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
const Home = () => {
  const [turfs, setTurfs] = useState([]);

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/turfs');
        setTurfs(res.data);
      } catch (error) {
        console.error('Error fetching turfs', error);
      }
    };

    fetchTurfs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-10">
      <Carousel />
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Near by Turfs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {turfs.map((turf) => (
          <div
            key={turf._id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
          >
            <img
              src={turf.photos[0] || '/default-turf.webp'}
              alt={turf.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">{turf.name}</h2>
              <p className="text-gray-500 text-sm mb-2">{turf.address}</p>
              <div className="flex items-center justify-between">
                <span className="text-yellow-400 font-bold">{turf.rating.toFixed(1)}⭐</span>
                <span className="text-gray-400 text-xs">{turf.votes} votes</span>
              </div>
              <Link
                to={`/turfs/${turf._id}`}
                className="block mt-4 text-center bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
