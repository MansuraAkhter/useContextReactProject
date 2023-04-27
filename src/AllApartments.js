import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "./firebaseConfig";

import building from "./images/building.png";

const AllApartments = () => {
  const navigate = useNavigate();
  const [apartments, setApartments] = useState([]);
  const apartmentCollectionRef = collection(db, "apartments");

  useEffect(() => {
    const getApartments = async () => {
      const data = await getDocs(apartmentCollectionRef);
      setApartments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getApartments();
  }, []);

  const handleClick = (id) => {
    navigate(`/apartmentDetails/${id}`);
  };

  return (
    <div className="flex flex-wrap flex-row justify-center">
      {apartments.map((apartment) => {
        return (
          <div
            key={apartment.id}
            onClick={() => handleClick(apartment.id)}
            className=" m-5  overflow-hidden w-52 md:w-1/4 shadow-md cursor-pointer"
          >
            <img src={building} alt="property" className="w-96" />
            <h1 className=" text-center text-2xl">{apartment.name}</h1>
            <h1 className="text-center p-2">{apartment.location}</h1>

            <br />
          </div>
        );
      })}
    </div>
  );
};

export default AllApartments;
