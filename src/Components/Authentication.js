import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
//import CurrentUser from "./CurrentUser";
import SignUpAndSignIn from "./SignUpAndSignIn";
import { UserContext } from "../Providers/UserProvider";

const Authentication = withRouter(({ loading, history }) => {
  const { user } = useContext(UserContext);
  if (loading) return null;
  return <>{user ? history.push("/dashboard") : <SignUpAndSignIn />}</>;
});

export default Authentication;
