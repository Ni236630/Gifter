import React, { useState, useContext, createContext } from "react";
import { UserProfileContext } from './UserProfileProvider';

export const PostContext = createContext();

export const PostProvider = (props) => {
  const apiUrl = "/api/Post";
  const { getToken } = useContext(UserProfileContext);

  const [posts, setPosts] = useState([]);
  const [dateSort, setDateSort] = useState([]);

  const getAllPosts = () => 
  getToken().then((token) => 
      fetch(apiUrl, {
        method: "GET", 
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => res.json())
      .then(setPosts));
  

      const searchPost = (searchTerm) =>
         getToken().then((token) => 
            fetch(`/api/Post/search?q=${searchTerm}&sortDesc=false`,{
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then((res) => res.json())
            .then(setPosts));
      
  const addPost = (post) => 
    getToken().then((token) => fetch("/api/Post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }));
  


  const searchByDate = (date) => {
    return getToken().then((token) => fetch(`/api/Post/searchHottest?q=${date}&sortDesc=false`,{
      method:"GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => res.json())
    .then(setDateSort));
  }
  const getPost = (id) => {
    return getToken().then((token) => fetch(`/api/Post/${id}`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => res.json()));
};

  return (
    <PostContext.Provider value={{getPost, dateSort, posts,setPosts, getAllPosts, addPost, searchPost, searchByDate }}>
      {props.children}
    </PostContext.Provider>
  );
};