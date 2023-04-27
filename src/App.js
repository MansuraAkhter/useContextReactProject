import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import AllApartments from "./AllApartments";
import ApartmentDetails from "./ApartmentDetails";
import BookingStore from "./BookingStore";
import Signin from "./Signin";
import {
  BookedApartmentContext,
  BookedApDetailsContext,
  AuthContext,
} from "./Helper/Context";
import PrivateRoutes from "./PrivateRoutes";
import { useState } from "react";

function App() {
  const [bookedApId, setBookedApId] = useState("");
  const [bookedApDetails, setBookedApDetails] = useState([]);
  const [user, setUser] = useState({});
  return (
    <div>
      <BrowserRouter>
        <BookedApartmentContext.Provider value={{ bookedApId, setBookedApId }}>
          <BookedApDetailsContext.Provider
            value={{ bookedApDetails, setBookedApDetails }}
          >
            <AuthContext.Provider value={{ user, setUser }}>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/admin" element={<Signin />} />
                  <Route element={<PrivateRoutes />}>
                    <Route path="/bookingList" element={<BookingStore />} />
                  </Route>

                  <Route path="/" element={<AllApartments />} />
                  <Route
                    path="/apartmentDetails/:id"
                    element={<ApartmentDetails />}
                  />
                </Route>
              </Routes>
            </AuthContext.Provider>
          </BookedApDetailsContext.Provider>
        </BookedApartmentContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
