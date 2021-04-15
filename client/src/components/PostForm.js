import React, {useContext, useState} from "react";
import { PostContext } from "../providers/PostProvider";
import { useHistory } from "react-router-dom";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
  } from "reactstrap";


export const PostForm = () => {
    const {addPost} = useContext(PostContext);
    const [post, setPost] = useState({
        title: "", 
        imageUrl: "", 
        caption: "", 
        dateCreated: new Date(),
        userProfileId : 1, 

    });

    const history = useHistory();

    const handleControlledInputChangePost = (event) => {
        const newPost = { ...post };

        newPost[event.target.id] = event.target.value;
        setPost(newPost);
    }

    const handleSavePost = () => {
        addPost({
            title : post.title, 
            imageUrl : post.imageUrl, 
            caption : post.caption,
            dateCreated:new Date(),
            userProfileId : 1
        })
        .then((p) => {
            history.push("/");
        });
            
    };
    return (
        <div className="post__form container">
            <Card>
            <CardBody>
            <Form>
            <h2 className="post__form--title">New Post</h2>
            <FormGroup>
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
            </FormGroup>
            <FormGroup>
                <div className="form-group">
                <label htmlFor="url">Gif url:  </label>
            <input
               autoComplete="off"
              type="text"
              id="imageUrl"
              onChange={handleControlledInputChangePost}
              required
              autoFocus
              className="form-control"
              placeholder="Post url"
              value={post.imageUrl}
            />
                </div>
            </FormGroup>
            <FormGroup>
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
        </FormGroup>
        </Form>
        <Button className="savePost " color="info" onClick={(event) => {
         event.preventDefault();
         handleSavePost()
         
        }}> Save Post </Button>
        </CardBody>
        </Card>
        </div>
    )
};

export default PostForm;