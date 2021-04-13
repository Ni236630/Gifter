import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [dateSort, setDateSort] = useState([]);

  const getAllPosts = () => {
    return fetch("/api/post")
      .then((res) => res.json())
      .then(setPosts);
  };

  const addPost = (post) => {
    return fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
    ;
  };

  const searchPost = (searchTerm) =>{
      return fetch(`/api/Post/search?q=${searchTerm}&sortDesc=false`)
        .then((res) => res.json())
        .then(setPosts);
  }

  const searchByDate = (date) => {
    return fetch(`/api/Post/searchHottest?q=${date}&sortDesc=false`)
    .then((res) => res.json())
    .then(setDateSort);
  }

  return (
    <PostContext.Provider value={{dateSort, posts,setPosts, getAllPosts, addPost, searchPost, searchByDate }}>
      {props.children}
    </PostContext.Provider>
  );
};