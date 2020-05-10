import React, { Component } from "react";

class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    console.log(this.props.match.params.login);
  }
  render() {
    const {
      name,
      avater,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gist,
      hireable,
    } = this.props.user;
    console.log(name);

    const { loading } = this.props.loading;
    return (
      <div>
        <h1>{name}</h1>
      </div>
    );
  }
}

export default User;
