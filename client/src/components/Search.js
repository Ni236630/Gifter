import React, { useState, useContext} from "react";
import { PostContext } from "../providers/PostProvider";



export const SearchPosts = () => {

    const {searchPost} = useContext(PostContext);   
    const [searchTerm, setSearchTerm] = useState("");
    

    const handleControlledInputChangePost = (event) => {
        setSearchTerm(event.target.value);

   }

  

    return (
        <div className="Post__Search container">
    <h2>Search...</h2>
    <fieldset>
    <div className="form-group">
    <label htmlFor="search">Search: </label>
    <input
      type="text"
      id="search"
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
 searchPost(searchTerm);
 
}}> Search 
</div>
</div>
    )
}

export default SearchPosts;