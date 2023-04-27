import { useState, useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import {
  BookedApartmentContext,
  BookedApDetailsContext,
} from "./Helper/Context";

const Booking = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { bookedApId, setBookedApId } = useContext(BookedApartmentContext);
  const { bookedApDetails, setBookedApDetails } = useContext(
    BookedApDetailsContext
  );

  const bookingsCollectionRef = collection(db, "bookings");

  const handleSubmit = async (e) => {
    console.log(bookedApDetails.name);
    e.preventDefault();
    await addDoc(bookingsCollectionRef, {
      apartmentId: bookedApId,
      apartment: bookedApDetails.name,
      location: bookedApDetails.location,
      name: name,
      email: email,
      phone: phone,
    });
    setName("");
    setEmail("");
    setPhone("");
  };
  return (
    <div className="bg-blue-900 text-white p-24">
      <h1 className=" text-3xl text-center p-5">Book the Property</h1>
      <div className="flex justify-center leading-10 ">
        <form className="  p-5 md:px-24 bg-white text-gray-600">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            className=" border-2 border-blue-600 rounded-sm m-2 px-2 focus:outline-none focus:border-2 focus:border-gray-600"
          />
          <br />
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className=" border-2 border-blue-600 rounded-sm m-2 px-2 focus:outline-none focus:border-2 focus:border-gray-600"
          />
          <br />
          <label htmlFor="phone">Phone: </label>
          <input
            type="text"
            name="phone"
            required
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phone}
            className=" border-2 border-blue-600 rounded-sm m-2 px-2 focus:outline-none focus:border-2 focus:border-gray-600"
          />

          <br />
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className=" px-10 mt-5 bg-blue-900 text-white rounded-sm  hover:bg-blue-400 transition ease-out duration-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
