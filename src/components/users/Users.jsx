import React, { Component } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/spinner";

export class Users extends Component {
  state = {
    showMore: 6,
  };

  showMoreUsers = () => {
    const currentstate = this.state.showMore;
    const increaseState = currentstate + 6;
    this.setState({ showMore: increaseState });
  };
  render() {
    if (this.props.loading) {
      return <Spinner />;
    } else {
      return (
        <div style={userStyle}>
          {this.props.users
            .filter((el, indx) => indx < this.state.showMore)
            .map((user) => {
              return (
                <UserItem
                  key={user.id}
                  login={user.login}
                  avatar={user.avatar_url}
                  html={user.html_url}
                />
              );
            })}
          <button onClick={this.showMoreUsers}>More</button>
        </div>
      );
    }
  }
}

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGap: "1rem",
};

export default Users;
