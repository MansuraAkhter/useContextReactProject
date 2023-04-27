import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "./Helper/Context";
import { useContext } from "react";

const PrivateRoutes = () => {
  const { user, setUser } = useContext(AuthContext);
  return <div>{user ? <Outlet /> : <Navigate to="/signin" />}</div>;
};

export default PrivateRoutes;
