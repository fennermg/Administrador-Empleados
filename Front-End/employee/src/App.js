import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Create from "./components/Create";
import Update from "./components/Update";
import Main from "./components/Main";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/nuevo" component={Create} />
          <Route exact path="/:id/editar" component={Update} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
