import React from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";

import Alert from "./components/layout/Alert";
import User from "./components/users/User";

import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { About } from "./components/pages/About";
import { Home } from "./components/pages/Home";
import { NotFound } from "./components/pages/NotFound";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar title="GitHub Finder" />

            <div className="container">
              <Alert />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};
export default App;
