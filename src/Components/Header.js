import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

/* start Styling */

const LogoText = styled.h1`
  font-size: 30px;
  margin: 0 0 -8px 0;
  padding: 0;
`;

const Span = styled.span`
  margin-bottom: 25px;
`;

/* end Styling */

const Header = () => {
  return (
    <>
      <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
        <LogoText>
          <FontAwesomeIcon
            icon={faCaretLeft}
            style={{ fontSize: "35px", verticalAlign: "-18%" }}
          />
          BackLife
        </LogoText>
        <Span style={{ fontSize: "10px" }}>a backlog that solves problems</Span>
      </Link>
      <Link to="/login">login</Link>
    </>
  );
};

export default Header;
