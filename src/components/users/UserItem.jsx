import React from "react";
import PropTypes from "prop-types";

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
        <a href={html} className="btn btn-dark btn-sm my-1">
          More
        </a>
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
