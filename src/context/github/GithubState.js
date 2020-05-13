import React, { useReducer } from "react";
import axios from "axios";
import githubContext from "./githubContext";
import githubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
  INCREASE_USER_VIEW,
} from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    showMore: 6,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //SEARCH USER

  const searchUsers = async (text) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secrey=${githubClientSecret}`
    );
    const data = await res.data.items;
    dispatch({
      type: SEARCH_USERS,
      payload: data,
    });
  };

  //GET USER
  const getUser = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secrey=${githubClientSecret}`
    );
    const data = res.data;

    dispatch({
      type: GET_USER,
      payload: data,
    });
  };
  //GET REPOS
  const getUserRepo = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  //CLEAR USERS

  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS,
    });
  };

  //SET LOADING
  const setLoading = () => dispatch({ type: SET_LOADING });

  //INCREASE USER VIEWA

  const showMoreUsers = () => {
    dispatch({
      type: INCREASE_USER_VIEW,
      payload: initialState.showMore + 6,
    });
  };

  return (
    <githubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepo,
        showMoreUsers,
      }}
    >
      {props.children}
    </githubContext.Provider>
  );
};

export default GithubState;
