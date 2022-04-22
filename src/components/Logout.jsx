import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContextProvider";

const Logout = () => {
  let navigate = useNavigate();
  const auth = React.useContext(AuthContext);

  const handleClick = () => {
    auth.logout();
    navigate('/');
  }

  return (
    <div>
      <p>I am the Logout. Ready to leave, {auth.user}</p>
      <button onClick={handleClick}>Log out</button>
    </div>
  );
}

export default Logout;