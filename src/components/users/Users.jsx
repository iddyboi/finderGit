import React, { useState, useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/spinner";
import GithubContext from "../../context/github/githubContext";

const Users = () => {
  const [showMore, setShowmore] = useState(6);

  const githubContext = useContext(GithubContext);

  const { loading, users } = githubContext;

  const showMoreUsers = () => {
    const currentstate = showMore;
    const increaseState = currentstate + 6;
    setShowmore(increaseState);
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users
          .filter((el, indx) => indx < showMore)
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
        <button onClick={showMoreUsers}>More</button>
      </div>
    );
  }
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGap: "1rem",
};

export default Users;
