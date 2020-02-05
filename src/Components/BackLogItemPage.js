import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Providers/UserProvider";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utils";
import { withRouter } from "react-router-dom";

const BackLogItemPage = props => {
  const { user } = useContext(UserContext);
  const [state, setState] = useState({ item: null, results: [] });
  const itemId = props.match.params.id;
  const itemRef = firestore.doc(`items/${itemId}`);
  const resultsRef = itemRef.collection("results");

  const createResult = result => {
    resultsRef.add({
      result,
      user
    });
  };

  useEffect(() => {
    const unsubscribeFromItem = itemRef.onSnapshot(snapshot => {
      const item = collectIdsAndDocs(snapshot);
      setState({ ...state, item });
    });
    const unsubscribeFromResults = resultsRef.onSnapshot(snapshot => {
      const results = snapshot.docs.map(collectIdsAndDocs);
      setState({ ...state, results });
    });

    return function cleanup() {
      unsubscribeFromItem();
      unsubscribeFromResults();
    };
  }, []);

  console.log(state);
  return (
    <div onClick={() => createResult("yo")}>
      yeeaaa boyyeeee {props.match.params.id}
    </div>
  );
};

export default withRouter(BackLogItemPage);
