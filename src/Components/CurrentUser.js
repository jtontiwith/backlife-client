import React from "react";
import { signOut } from "../firebase";
import { Link } from "react-router-dom";

const CurrentUser = ({ user }) => {
  return (
    <>
      <button onClick={signOut}>sign out</button>
      <Link to="/profile">{user.displayName}</Link>
    </>
  );
};

export default CurrentUser;
