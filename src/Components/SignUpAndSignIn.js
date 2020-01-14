import React, { useState } from "react";
import { auth, signInWithGoogle, createUserProfileDocument } from "../firebase";
import Form from "./Form";
import TextArea from "./TextArea";
import Input from "./Input";
import Box from "./Box";
import Button from "./Button";

const SignUpAndSignIn = () => {
  const [state, setState] = useState({
    displayName: "",
    email: "",
    password: ""
  });

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

  return (
    <>
      <Box background="#d4d7dd">
        <TextArea value="" placeholder="name" />
        <TextArea value="" placeholder="email" />
        <Button>sign in</Button>
        <Button type="button" onClick={signInWithGoogle}>
          google
        </Button>
      </Box>
      <Box background="#d4d7dd">
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
          display="block"
          margin="0 0 10px 0"
          name="password"
          value={state.password}
          placeholder="password"
        />
        <Button onClick={handleEvent}>sign up</Button>
      </Box>
    </>
  );
};

export default SignUpAndSignIn;
