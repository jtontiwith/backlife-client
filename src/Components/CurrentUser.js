import React from "react";
import { signOut } from "../firebase";
import { Link } from "react-router-dom";
//<Link to="/profile">{user.displayName}</Link>
const CurrentUser = ({ user }) => {
  return (
    <>
      <button onClick={signOut}>sign out</button>
    </>
  );
};

export default CurrentUser;
