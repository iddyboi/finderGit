import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserItem = ({ avatar, login, html }) => {
  return (
    <div className="card text-center">
      <img
        src={avatar}
        alt="avatar"
        className="round-img"
        style={{ width: "60px" }}
      />
      <h3>{login}</h3>
      <div>
        <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">
          More
        </Link>
      </div>
    </div>
  );
};

UserItem.prototype = {
  avatar: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
};
export default UserItem;
