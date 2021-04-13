import React, {useState,useContext, useEffect, Fragment } from "react";
import { PostContext } from "../providers/PostProvider";
import Post from "./Post";

const PostList = () => {
  const { posts, getAllPosts } = useContext(PostContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

 
  useEffect(() => {
      getAllPosts();
      setFilteredPosts(
          posts.filter((post) => 
              post.title.toLowerCase().includes(searchTerm.toLowerCase()))
      )
  }, [searchTerm, posts])

  const { searchPost } = useContext(PostContext);


 


    const handleControlledInputChangePost = (event) => {
             setSearchTerm(event.target.value);

        }

  return (
      <>
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
<div className="savePost btn btn-primary" onClick={(event) => {
 event.preventDefault();
 setFilteredPosts(searchTerm);
 
}}> Search 
</div>
</div>
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {filteredPosts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default PostList;