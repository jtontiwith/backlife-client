import React, { useContext } from "react";
import BackLogItem from "./BackLogItem";
import Box from "./Box";
import { ItemsContext } from "../Providers/ItemsProvider";

const BackLogItemList = () => {
  const value = useContext(ItemsContext);

  return (
    <Box>
      {value.state.items.map((item, index) => {
        return (
          <BackLogItem
            key={item.id}
            id={item.id}
            index={index}
            text={item.title}
            itemsArrLength={value.state.items.length}
            handleEvent={value.handleEvent}
          />
        );
      })}
    </Box>
  );
};

export default BackLogItemList;
