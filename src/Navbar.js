import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./Helper/Context";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useState, useContext } from "react";
import "./index.css";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin");
  };

  const openAdmin = async () => {
    navigate("/admin");
  };

  return (
    <div className="sticky top-0 z-30 bg-white">
      <div className="  flex justify-between shadow pb-4 mt-2">
        <div className="text-4xl text-blue-900 font-semibold md:px-10  ">
          LOGO
        </div>
        <div className="hidden md:block">
          {user?.email ? (
            <nav className="text-gray-500 text-lg ">
              <NavLink to="/" className="nav ">
                Properties
              </NavLink>

              <NavLink to="/bookingList" className="nav">
                Bookings
              </NavLink>
            </nav>
          ) : (
            ""
          )}
        </div>
        <div
          className="text-yellow-100  bg-blue-900 px-5 cursor-pointer   rounded-md pt-1 hover:bg-blue-400 transition ease-out duration-500"
          onClick={openAdmin}
        >
          Admin panel
        </div>
        <div className="flex text-gray-400 text-lg">
          {user?.email ? (
            <div
              onClick={handleLogout}
              className="text-yellow-100  bg-blue-900 px-5 cursor-pointer   rounded-md pt-1 hover:bg-blue-400 transition ease-out duration-500"
            >
              Sign out
            </div>
          ) : (
            ""
            // <div
            //   onClick={() => {
            //     navigate("/signin");
            //   }}
            //   className="text-yellow-100 w-24 bg-gray-700 px-5 cursor-pointer border-solid rounded-3xl pt-1 hover:bg-red-300 transition ease-out duration-500"
            // >
            //   Sign in
            // </div>
          )}
          {/* <div>{user?.email}</div> */}

          <div
            className="w-8 md:hidden cursor-pointer items-center pt-1 "
            onClick={() => {
              setMobileMenu(!mobileMenu);
            }}
          >
            <svg
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      {mobileMenu && (
        <div className="text-center shadow-lg leading-relaxed md:hidden">
          <ul>
            <li>
              <NavLink
                to="/"
                className="nav "
                onClick={() => {
                  setMobileMenu(!mobileMenu);
                }}
              >
                Properties
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/bookingList"
                className="nav"
                onClick={() => {
                  setMobileMenu(!mobileMenu);
                }}
              >
                Bookings
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
