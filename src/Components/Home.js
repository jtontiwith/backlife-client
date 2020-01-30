import React from "react";
import styled from "styled-components";
import Header from "./Header";

/*
john-schnobrich-2FPjlAyMQTA-unsplash.jpg
greg-rakozy-oMpAz-DN-9I-unsplash.jpg
*/
const Div = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(john-schnobrich-2FPjlAyMQTA-unsplash.jpg);
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const P = styled.p`
  color: #fff;
  font-size: 50px;
  font-weight: 600;
  text-align: center;
  width: 70%;
  margin: 50px auto;
`;

const Home = () => {
  return (
    <Div>
      <Header home={true} />
      <P>get a handle on your tasks by handing them off to others</P>
    </Div>
  );
};

export default Home;
