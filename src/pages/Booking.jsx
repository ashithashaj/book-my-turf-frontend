import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";




// Helper to format date
const formatDate = (date) => {
  const options = { day: "2-digit", month: "short" }; // Example: 28 Apr
  return date.toLocaleDateString("en-US", options);
};

export default function BookingPage() {

  const navigate = useNavigate()
const handleConfirmBooking = () => {
  const selectedDate = dates[selectedDateIndex].date;

  const bookingData = {
    turf,
    selectedDate,
    selectedSlots,
    totalPrice,
  };

  localStorage.setItem("bookingData", JSON.stringify(bookingData));
  navigate("/checkout");
};

  const { id } = useParams();
  const [dates, setDates] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTurf = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/turfs/${id}`);
        setTurf(res.data);
      } catch (error) {
        console.error("Error fetching turf details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTurf();
  }, [id]);

  useEffect(() => {
    const today = new Date();
    const tempDates = [];

    for (let i = 0; i <= 10; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      tempDates.push({
        date: formatDate(date),
        slots: generateSlotsForDate(date),
      });
    }

    setDates(tempDates);
  }, []);

  const generateSlotsForDate = (date) => {
    return [
      "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM",
      "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"
    ];
  };

  const handleSlotClick = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  if (loading || !turf || dates.length === 0) return <div>Loading...</div>;

  const totalPrice = selectedSlots.length * turf.price;

  return (
    <div className="p-6 pb-31 px-24 space-y-6 mx-auto">
      <h1 className="text-2xl font-bold">{turf.name}</h1>

      {/* Date Selector */}
      <div className="flex space-x-4 overflow-x-auto">
        {dates.map((day, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedDateIndex(index);
              setSelectedSlots([]);
            }}
            className={`p-3 rounded-lg border ${
              index === selectedDateIndex ? "bg-[#F7374F] text-white" : "bg-gray-100"
            }`}
          >
            {day.date}
          </button>
        ))}
      </div>

      {/* Time Slots */}
      <div className="grid grid-cols-3 gap-4">
        {dates[selectedDateIndex].slots.map((slot, index) => (
          <button
            key={index}
            onClick={() => handleSlotClick(slot)}
            className={`p-2 border rounded-lg ${
              selectedSlots.includes(slot) ? "bg-gray-600 text-white" : "bg-gray-100"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>

      {/* Price */}
      <div className="flex justify-between items-center border-t pt-4">
        <div className="text-xl font-semibold">Total: ₹{totalPrice}</div>
        <button onClick={handleConfirmBooking} className="px-6 py-2 bg-[#F7374F] text-white rounded-lg">
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
