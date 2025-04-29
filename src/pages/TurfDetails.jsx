import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Gallery from '../components/Gallery';
import { Link } from 'react-router-dom';
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
            <div className="bg-[#393E46] rounded-2xl p-6 px-24 shadow-lg flex justify-between items-center text-white">
                <div className='flex gap-12'>
                    <img
                        src={turf.photos[0] || '/default-turf.webp'}
                        alt={turf.name}
                        className="w-72 h-80 object-cover rounded-2xl mb-6"
                    />
                    <div className='min-w-[12rem] flex flex-col justify-center'>
                        <h1 className="text-4xl font-bold  mb-4">{turf.name}</h1>
                        <p className=" text-lg mb-2">{turf.address}</p>
                        <p className=" text-lg mb-2">{turf.locationId.city} , {turf.locationId.state}</p>
                        <p className=" text-lg mb-2">Price: ₹{turf.price}</p>
                        <p className=" text-lg mb-2">Phone: {turf.phoneNumber}</p>
                        <div className="flex justify-between items-center gap-2 mt-4 bg-[#222831] p-2 rounded-md">
                            <span className="text-yellow-400 text-xl">{turf.rating.toFixed(1)}⭐</span>
                            <span className="text-gray-400">{turf.votes} votes</span>
                        </div>
                    </div>
                </div>

                <div>
                    <Link
                        to={`/booking/${turf._id}`}
                        state={{ turfName: turf.name, turfPrice: turf.price }}
                        className="block mt-4 text-center bg-[#F7374F] text-white py-2 w-32 rounded-lg transition duration-300"
                    >
                        Book Now
                    </Link>
                </div>
            </div>
            <div className='flex justfy-between  mt-10'>
                <div className='w-1/2'>
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Description</h1>
                    <p className="text-lg text-gray-600">{turf.description}</p>
                </div>
                <div className='w-1/2'>
                    <Gallery photos={turf.photos} />
                </div>

            </div>
        </div>
    );
};

export default TurfDetails;
