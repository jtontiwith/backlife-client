import React, { useState } from "react";
import { auth, signInWithGoogle, createUserProfileDocument } from "../firebase";
import styled from "styled-components";
import Input from "./Input";
import Box from "./Box";
import Button from "./Button";

const P = styled.p`
  font-weight: 700;
  font-size: 18px;
  align-self: center;
`;

const Span = styled.span`
  color: #2582ff;
  :hover {
    cursor: pointer;
  }
`;

const GoogleButton = styled.input`
  height: auto;
  width: 70%;
  align-self: center;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
`;

const SignUpAndSignIn = () => {
  const [state, setState] = useState({
    displayName: "",
    email: "",
    password: ""
  });

  const [signInToggle, setSignInToggle] = useState(true);

  const signUp = async () => {
    const { email, password, displayName } = state;
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      //user.updateProfile({ displayName });
      createUserProfileDocument(user, { displayName });
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async () => {
    const { email, password } = state;
    try {
      const { user } = await auth.signInWithEmailAndPassword(
        email,
        password
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEvent = e => {
    const { type } = e;
    const { name, value } = e.target;
    switch (type) {
      case "change":
        return setState({
          ...state,
          [name]: value
        });
      case "click":
        return signUp();
      default:
        console.log(`There no case for event type: ${type}`);
    }
  };

  const signInElement = (
    <Div>
      <Box
        border="1.5px solid #d4d7dd"
        display="flex"
        flexDirection="column"
        width="40%"
        minWidth="300px"
      >
        <P>Sign in</P>
        <Input handleEvent={handleEvent} value={state.email} name="email" placeholder="email" margin="0 0 10px 0" />
        <Input type="password" handleEvent={handleEvent} value={state.password} name="password" placeholder="password" margin="0 0 10px 0" />
        <Button onClick={signIn} width="100%" height="50px" margin="0 0 10px 0">
          sign in
        </Button>
        <P>or</P>
        <GoogleButton
          onClick={signInWithGoogle}
          type="image"
          src="../../btn_google_signin_dark_normal_web@2x.png"
        />
        <P onClick={() => setSignInToggle(false)}>
          Don't have an account? <Span>Sign up</Span>
        </P>
      </Box>
    </Div>
  );

  const signUpElement = (
    <Div>
      <Box
        border="1.5px solid #d4d7dd"
        display="flex"
        flexDirection="column"
        width="40%"
        minWidth="300px"
      >
        <P>Sign Up</P>
        <Input
          handleEvent={handleEvent}
          display="block"
          margin="0 0 10px 0"
          name="displayName"
          value={state.displayName}
          placeholder="name"
        />
        <Input
          handleEvent={handleEvent}
          display="block"
          margin="0 0 10px 0"
          name="email"
          email="email"
          value={state.email}
          placeholder="email"
        />
        <Input
          handleEvent={handleEvent}
          type="password"
          display="block"
          margin="0 0 10px 0"
          name="password"
          value={state.password}
          placeholder="password"
        />
        <Button onClick={signUp} width="100%" height="50px">
          sign up
        </Button>
        <P>or</P>
        <GoogleButton
          onClick={signInWithGoogle}
          type="image"
          src="../../btn_google_signin_dark_normal_web@2x.png"
        />
        <P onClick={() => setSignInToggle(true)}>
          Already have an account? <Span>Sign in</Span>
        </P>
      </Box>
    </Div>
  );

  return <>{signInToggle === true ? signInElement : signUpElement}</>;
};

export default SignUpAndSignIn;
