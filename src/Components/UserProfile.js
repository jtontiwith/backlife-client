import React, { useState } from "react";
import { auth, firestore, storage } from "../firebase";
import Input from "./Input";
import Button from "./Button";

const UserProfile = () => {
  const [displayName, setDisplayName] = useState({ displayName: "" });
  const imageInput = null;

  const handleSubmit = e => {
    //maybe async?
    console.log("handlin submit boyeee");
    const { uid } = auth.currentUser || {};
    const userRef = firestore.doc(`users/${uid}`);
    if (displayName) {
      userRef.update(displayName);
    }
  };

  //this is not a class component so just get it the normal way
  //we want the auth.currentUser.uid and a ref

  return (
    <>
      <section>
        <Input
          handleEvent={e => setDisplayName({ [e.target.name]: e.target.value })}
          name={"displayName"}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </section>
    </>
  );
};

export default UserProfile;
