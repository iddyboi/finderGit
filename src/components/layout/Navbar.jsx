import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="navbar bg-primary">
        <h1>
          <i className="fab fa-github"></i>
          {title}
        </h1>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </ul>
      </div>
    );
  }
}

export default Navbar;
