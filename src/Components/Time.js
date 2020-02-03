import React from "react";
import styled from "styled-components";

const StyledTime = styled.time`
  width: 75px;
  min-width: 50px;
  height: 65px;
  font-size: 18px;
  margin-left: 10px;
  background-color: #F4F6F9;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Time = ({ time }) => {
  const showTime = date => {
    const current = new Date();
    date = new Date(date.seconds * 1000);
    let diff = (current - date) / 1000 / 60;
    diff = Math.round(diff); //in minutes

    if (diff < 60) {
      return `${diff}m`; //minutes
    } else if (diff < 1440) {
      const hoursSince = diff / 60;
      return `${Math.round(hoursSince)}h`; //hours
    } else {
      return date.toDateString().substring(4, 10); //days
    }
  };

  return <StyledTime>{showTime(time)}</StyledTime>;
};

export default Time;
