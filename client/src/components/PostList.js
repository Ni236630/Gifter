import React, {useState,useContext, useEffect, Fragment } from "react";
import { PostContext } from "../providers/PostProvider";
import Post from "./Post";

const PostList = () => {
  const { posts, getAllPosts, searchPost, searchByDate, dateSort, setPosts } = useContext(PostContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState("");
  

  useEffect(() => {
    if (dateSort.length !== 0) {
     
     setPosts(dateSort);
     
    } else if (searchTerm !== "" && date === "") {
     
      searchPost(searchTerm);

    } else  {
         getAllPosts();
    }
  }, [searchTerm, dateSort])

  const handleControlledInputChangePost = (event) => {
        setSearchTerm(event.target.value);

   }

  const handleControlledInputChangeDate = (event) => {
    setDate(event.target.value);

   }

   

  return (
      <>
      <div className="Post__Search--Date container">
    <h2>Search...</h2>
    <fieldset>
    <div className="form-group">
    <label htmlFor="search">Search By Date: </label>
    <input
      type="text"
      id="dateSort"
      onChange={handleControlledInputChangeDate}
      required
      className="form-control"
      placeholder="YYYYMMDD"
      value={date}
    />
    </div>
    <div className="savePost btn btn-primary" onClick={(event) => {
 event.preventDefault();
 searchByDate(date);
 
}}> Search 
</div>
    </fieldset>
    </div>
      <div className="Post__Search container">
    <h2>Search...</h2>
    <fieldset>
    <div className="form-group">
    <label htmlFor="search">Search: </label>
    <input
      type="text"
      id="caption"
      onChange={handleControlledInputChangePost}
      required
      className="form-control"
      placeholder="Search..."
      value={searchTerm}
    />
    </div>
    </fieldset>

</div>
<div className="container">
  <div className="row justify-content-center">
    <div className="cards-column">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  </div>
</div>

    </>
  );
};

export default PostList;