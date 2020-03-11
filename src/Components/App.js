import React from "react";
import Authentication from "./Authentication";
import CurrentUser from "./CurrentUser";
import DashBoard from "./DashBoard";
import Header from "./Header";
import Home from "./Home";
import UserProfile from "./UserProfile";
import { Switch, Route, withRouter } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import BackLogItemPage from "./BackLogItemPage";
import TestComponent from "./TestComponent";

const App = withRouter(({ location }) => {
  //<Authentication />
  const Div = styled.div`
    padding: 20px;
  `;
  return (
    <>
      <section className="row">
        <section className="column">
          {location.pathname !== "/" && <Header />}
          <Switch>
            <Route exact path="/" component={Home} />
            <Div>
              <Route exact path="/dashboard" component={DashBoard} />
              <Route exact path="/profile" component={UserProfile} />
              <Route exact path="/items/:id" component={BackLogItemPage} />
              <Route exact path="/login" component={Authentication} />
              <Route exact path="/logout" component={CurrentUser} />
              <Route exact path="/test" component={TestComponent} />
            </Div>
          </Switch>
        </section>
      </section>
    </>
  );
});

export default App;
