import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const BookingStore = () => {
  const [bookings, setBookings] = useState([]);
  const bookingCollectionRef = collection(db, "bookings");

  useEffect(() => {
    const getBookings = async () => {
      const data = await getDocs(bookingCollectionRef);
      setBookings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getBookings();
    console.log(bookings);
  }, []);

  return (
    <div className="flex justify-center bg-slate-100 pb-24">
      <div>
        <h1 className="text-3xl text-center font-bold text-blue-900 pt-10">
          Booked Properties
        </h1>
        {bookings.map((booking) => {
          return (
            <div
              key={booking.id}
              className="shadow-md m-10 p-5 bg-white md:flex md:justify-between text-gray-700"
            >
              <div className="md:pr-5">
                <h1>Apartment Id: {booking.apartmentId}</h1>
                <h1>
                  Apartment Name: <strong>{booking.apartment}</strong>
                </h1>
                <h1>Apartment Location: {booking.location}</h1>
              </div>
              <div className="pt-5 md:p-0">
                <h1>Booked by-</h1>
                <h1>Email: {booking.email}</h1>
                <h1>Name: {booking.name}</h1>
                <h1>Phone: {booking.phone}</h1>
              </div>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingStore;
