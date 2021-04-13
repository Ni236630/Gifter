import React, {useContext, useEffect, useState} from "react";
import { PostContext } from "../providers/PostProvider";



export const PostForm = () => {
    const {addPost, getAllPosts } = useContext(PostContext);

    //add UserProfileContext eventually;


    const [post, setPost] = useState({
        title: "", 
        imageUrl: "", 
        caption: "", 
        userProfileId : 1, 

    });

    useEffect(() => {
        getAllPosts();
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const handleControlledInputChangePost = ( event) => {
        const newPost = { ...post };

        newPost[event.target.id] = event.target.value;
        setPost(newPost);
    }

    const handleSavePost = () => {
        addPost({
            title : post.title, 
            imageUrl : post.imageUrl, 
            caption : post.caption,
            userProfileId : 1
        })
            
    };
    return (
        <div className="post__form container">
            <h2 className="post__form--title">New Post</h2>
            <fieldset>
                <div className="form-group">
                <label htmlFor="name">Post Title:  </label>
            <input
               autoComplete="off"
              type="text"
              id="title"
              onChange={handleControlledInputChangePost}
              required
              autoFocus
              className="form-control"
              placeholder="Post Title"
              value={post.title}
            />
                </div>
            </fieldset>
            <fieldset>
          <div className="form-group">
            <label htmlFor="caption">Caption: </label>
            <input
              type="text"
              id="caption"
              onChange={handleControlledInputChangePost}
              required
              className="form-control"
              placeholder="Caption"
              value={post.caption}
            />
          </div>
        </fieldset>
        <div className="savePost btn btn-primary" onClick={(event) => {
         event.preventDefault();
         handleSavePost()
         
        }}> Save Recipe
          
        </div>

        </div>
    )
};

export default PostForm;