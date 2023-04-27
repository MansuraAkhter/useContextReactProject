import { onSnapshot, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import building from "./images/building.png";
import Booking from "./Booking";
import {
  BookedApartmentContext,
  BookedApDetailsContext,
} from "./Helper/Context";
const ApartmentDetails = () => {
  const { id } = useParams();
  const [apartment, setApartment] = useState("");
  const { bookedApId, setBookedApId } = useContext(BookedApartmentContext);
  const { bookedApDetails, setBookedApDetails } = useContext(
    BookedApDetailsContext
  );

  const docRef = doc(db, "apartments", id);

  onSnapshot(docRef, (doc) => {
    setApartment(doc.data(), doc.id);
    setBookedApId(id);
    setBookedApDetails(apartment);
  });
  return (
    <div>
      <div className="md:flex md:justify-center m-10 items-center ">
        <div className="shadow-md md:flex md:justify-center items-center p-2">
          <div className="p-4 leading-10 text-lg ">
            <h1>Name: {apartment.name}</h1>
            <h1 className="bg-slate-100">Location: {apartment.location}</h1>
            <h1>Number of flats: {apartment.flatCount}</h1>
            <h1 className="bg-slate-100">
              Land area: {apartment.landArea} Katha
            </h1>
          </div>
          <div className="flex justify-center">
            <img src={building} alt="property" width="350px" />
          </div>
        </div>
      </div>
      <Booking />
    </div>
  );
};

export default ApartmentDetails;
