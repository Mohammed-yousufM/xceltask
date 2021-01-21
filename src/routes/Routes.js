import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "../components/LoginPage.js";
import FirstScreen from "../components/FirstScreen.js";

function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/FirstScreen" component={FirstScreen} />
      </Switch>
    </div>
  );
}

export default Routes;
