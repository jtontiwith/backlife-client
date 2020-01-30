import React, { useEffect } from "react";

const TestComponent = () => {
  useEffect(() => {
    console.log("so this runs");

    return () => console.log("test");
  }, []);

  return <>yo </>;
};

export default TestComponent;
