import React, { Component, Fragment } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import axios from "axios";
import Alert from "./components/layout/Alert";
import User from "./components/users/User";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { About } from "./components/pages/About";

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
  };
  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrey=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   const data = await res.data;
  //   this.setState({ users: data });

  //   if (this.state.users.length > 0) {
  //     this.setState({ loading: false });
  //   }
  //   console.log(data);
  // }

  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrey=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = await res.data.items;
    this.setState({ users: data });

    if (this.state.users.length > 0) {
      this.setState({ loading: false });
    }
    console.log(data);
  };

  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrey=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = res.data;
    console.log(data);
    this.setState({ user: data, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  setAlert = (message, type) => {
    this.setState({ alert: { message, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };
  render() {
    const { users, loading, user } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar title="GitHub Finder" />

          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                path
                exact
                render={(props) => {
                  return (
                    <Fragment>
                      <Search
                        searchUsers={this.searchUsers}
                        clearUsers={this.clearUsers}
                        showClear={users.length > 0 ? true : false}
                        setAlert={this.setAlert}
                      />

                      <Users users={users} loading={loading} />
                    </Fragment>
                  );
                }}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => {
                  return (
                    <User
                      {...props}
                      getUser={this.getUser}
                      user={user}
                      loading={loading}
                    />
                  );
                }}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
