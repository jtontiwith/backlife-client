import React from "react";

const BackLogItem = ({ text /*handleEvent, index, itemsArrLength*/ }) => {
  const limitText = (text) => text.slice(0, 20).trim() + (text.length > 20 ? "..." : "");
  return <div>{limitText(text)}</div>;
};

export default BackLogItem;
