import React from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : null};
  border: none;
  width: 65%;
  overflow: auto;
  outline: none;
  box-shadow: none;
  resize: none;
  font-size: 16px;
  line-height: 19px;
  display: inline-block;
  margin: 12px 18px 0 17px;
  padding: 0;
  ::placeholder {
    color: #7e8b9c;
  }
`;

const TextArea = ({ handleEvent, value, placeholder, backgroundColor }) => {
  return (
    <StyledTextArea
      value={value.text}
      onChange={handleEvent}
      placeholder={placeholder}
      backgroundColor={backgroundColor}
    ></StyledTextArea>
  );
};

export default TextArea;
