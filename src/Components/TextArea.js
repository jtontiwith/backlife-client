import React from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : null};
  border: none;
  width: 100%;
  overflow: auto;
  height: ${props => props.height ? props.height : null}
  outline: none;
  box-shadow: none;
  resize: none;
  font-size: 16px;
  line-height: 19px;
  display: inline-block;
  padding: 0;
  ::placeholder {
    color: #7e8b9c;
    margin-left: 0px;
  }
`;

const TextArea = ({ handleEvent, value, placeholder, backgroundColor, height }) => {
  return (
    <StyledTextArea
      value={value.text}
      onChange={handleEvent}
      height={height}
      placeholder={placeholder}
      backgroundColor={backgroundColor}
    ></StyledTextArea>
  );
};

export default TextArea;
