import React, { useContext } from "react";
import CurrentUser from "./CurrentUser";
import SignUpAndSignIn from "./SignUpAndSignIn";
import { UserContext } from "../Providers/UserProvider";

const Authentication = ({ loading }) => {
  const { user } = useContext(UserContext);
  if (loading) return null;
  return <>{user ? <CurrentUser user={user} /> : <SignUpAndSignIn />}</>;
};

export default Authentication;
