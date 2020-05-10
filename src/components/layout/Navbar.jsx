import React, { Component } from "react";

export class Navbar extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="navbar bg-primary">
        <h1>
          <i className="fab fa-github"></i>
          {title}
        </h1>
      </div>
    );
  }
}

export default Navbar;
