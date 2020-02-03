import React, { useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, withRouter } from "react-router-dom";
import { signOut } from "../firebase";
import { UserContext } from "../Providers/UserProvider";

/* start Styling */

const LogoText = styled.h1`
  font-size: ${props => (props.home ? "40px" : "31px")};
  margin: ${props => (props.home ? "0 0 -15px 0" : "0px")}
  padding: 0;
  color: ${props => (props.home ? "#FFF" : "#000")};
`;

const Span = styled.span`
  margin-bottom: 25px;
  color: ${props => (props.home ? "#FFF" : "#000")};
  font-size: 13px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  box-shadow: inset 0 -1px 0 rgba(100, 121, 143, 0.122);
`;

const Button = styled.button`
  color: home ? "#FFF" : "#000",
  alignSelf: "center",
  textDecoration: "none"
`;

/* end Styling */

const Header = withRouter(({ home, history, location }) => {
  const { clearUserObj } = useContext(UserContext)
  async function logOut() {
    try {
      await signOut();
      clearUserObj();
      return history.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  //const logOut = () => signOut().then(() => history.push("/"))

  let logInOut;
  if (location.pathname === "/dashboard") {
    logInOut = <Button onClick={logOut}>logout</Button>;
  } else if (location.pathname === "/") {
    logInOut = (
      <Link
        style={{
          color: home ? "#FFF" : "#000",
          alignSelf: "center",
          textDecoration: "none"
        }}
        to="/login"
      >
        login
      </Link>
    );
  } else {
    logInOut = null;
  }

  return (
    <Div>
      <Link to="/dashboard" style={{ textDecoration: "none", color: "#000" }}>
        <LogoText home={home}>
          <FontAwesomeIcon
            icon={faCaretLeft}
            style={{
              color: home ? "#FFF" : "#000",
              fontSize: home ? "45px" : "35px",
              verticalAlign: "-17%"
            }}
          />
          BackLife
        </LogoText>
        {home ? <Span home={home}>a backlog that solves problems</Span> : null}
      </Link>
      {logInOut}
    </Div>
  );
});

export default Header;
