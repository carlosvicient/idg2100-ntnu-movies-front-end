import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContextProvider";

const ProtectedRoute = ({ children }) => {
  // We could also replace React.useContext by a more declarative syntax using <AuthConsumer> like we did in <App>
  let auth = React.useContext(AuthContext);
  let location = useLocation();

  return (
    <>
      {auth.isLoading && <p>Loading</p>}
      {auth.isAuth && (children ? children : <Outlet />)}
      {!auth.isLoading && !auth.isAuth && <Navigate to="/login" state={{ from: location }} replace />}
    </>
  )
}

export default ProtectedRoute;