import React from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: ${props => (props.display ? props.display : null)};
`;

const Form = () => {
  return <StyledForm />;
};

export default StyledForm;
