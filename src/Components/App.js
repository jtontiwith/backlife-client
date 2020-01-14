import React from "react";
import Authentication from "./Authentication";
import DashBoard from "./DashBoard";
import Header from "./Header";
import Home from "./Home";
import UserProfile from "./UserProfile";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import BackLogItemPage from "./BackLogItemPage";

const App = () => {
  //<Authentication />
  return (
    <div>
      <section className="row">
        <section className="column">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={DashBoard} />
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/items/:id" component={BackLogItemPage} />
            <Route exact path="/login" component={Authentication} />
          </Switch>
        </section>
      </section>
    </div>
  );
};

export default App;
