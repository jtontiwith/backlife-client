import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background: ${props => (props.background ? props.background : "#2582FF")};
  border-radius: 2px;
  border: none;
  margin: ${props => (props.margin ? props.margin : null)};
  color: ${props => (props.color ? props.color : "#FFFFFF")};
  position: ${props => (props.position ? props.position : null)};
  right: ${props => (props.right ? props.right : null)};
  bottom: ${props => (props.bottom ? props.bottom : null)};
  width: ${props => (props.width ? props.width : "70px")};
  height: ${props => (props.height ? props.height : "30px")};
  font-size: 15px;
  font-weight: 800;
  vertical-align: 133%;
  :hover {
    cursor: pointer;
  }
`;

const Button = props => {
  return (
    <StyledButton
      onClick={props.onClick}
      background={props.background}
      width={props.width}
      height={props.height}
      color={props.color}
      border={props.border}
      margin={props.margin}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
