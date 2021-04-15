
import React, { useState, useEffect, createContext } from 'react';
import { Spinner } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";


export const UserProfileContext = createContext();

export const UserProfileProvider = (props) => {

    const apiUrl = "/api/UserProfile";



    const userprofile = sessionStorage.getItem("userProfile");
    const [isLoggedIn, setIsLoggedIn] = useState(userprofile != null);

    const [isFirebaseReady, setIsFireBaseReady] = useState(false);
    useEffect(() =>{
        firebase.auth().onAuthStateChanged((u) => {
            setIsFireBaseReady(true);
        });
    },[]);

    const login = (email, pw) => {
        return firebase.auth().signInWithEmailAndPassword(email,pw)
        .then((signInResponse) => getUserProfile(signInResponse.user.uid))
        .then((userprofile) => {
            sessionStorage.setItem("userProfile", JSON.stringify(userprofile));
            setIsLoggedIn(true);
        });
    };

    
    const logout = () => {
        return firebase.auth().signOut()
        .then(() => {
            sessionStorage.clear()
            setIsLoggedIn(false);
        });
    };

    const register = (userProfile, password) => {
        return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
        .then((createResponse) => saveUser({...userProfile, firebaseUserId: createResponse.user.uid }))
        .then((savedUserProfile) => {
            sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
            setIsLoggedIn(true);
        })
    }


    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getUserProfile = (firebaseUserId) => {
        return getToken().then((token) =>
            fetch(`/api/UserProfile/${firebaseUserId}`,{
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => res.json()))
    }


    const saveUser = (userProfile) => {
        return getToken().then((token) => 
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userProfile)
            }).then(res => res.json()));
    };




    return (
        <UserProfileContext.Provider value={{ isLoggedIn, login, logout, register, getToken }}>
            {isFirebaseReady
                ? props.children
                : <Spinner className="app-spinner dark" />
            }
        </UserProfileContext.Provider>

    )
} 