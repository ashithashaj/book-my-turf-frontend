import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const [bookingData, setBookingData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem("bookingData");
        if (data) {
            setBookingData(JSON.parse(data));
        } else {
            navigate("/"); // Redirect if no data
        }
    }, [navigate]);

    if (!bookingData) return <div>Loading...</div>;

    const { turf, selectedDate, selectedSlots, totalPrice } = bookingData;

    const handlePayment = () => {
        alert("Booking Confirmed!");
        localStorage.removeItem("bookingData");
        navigate("/");
    };

    return (
        <div className=" flex justify-center items-center min-h-[calc(100vh-10rem)]">
            <div className="p-6 max-w-2xl border-1  mx-auto">
                <h2 className="text-2xl font-bold mb-4 pb-4">Checkout</h2>

                <div className="space-y-4">
                    <div>
                        <strong>Turf:</strong> {turf.name}
                    </div>
                    <div>
                        <strong>Date:</strong> {selectedDate}
                    </div>
                    <div>
                        <strong>Selected Slots:</strong> {selectedSlots.join(", ")}
                    </div>
                    <div className="text-xl pt-4 font-semibold">Total: ₹{totalPrice}</div>
                </div>

                <button
                    onClick={handlePayment}
                    className="mt-6 w-full px-6 py-3 bg-[#F7374F] text-white rounded-lg"
                >
                    Pay & Confirm
                </button>
            </div>
        </div>
    );
}
