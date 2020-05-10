import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
    loading: false,
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
  render() {
    return (
      <div className="App">
        <Navbar title="GitHub Finder" />

        <div className="container">
          <Search searchUsers={this.searchUsers} />
          <Users users={this.state.users} loading={this.state.loading} />
        </div>
      </div>
    );
  }
}
export default App;
