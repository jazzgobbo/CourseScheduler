// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, onValue, ref, set } from 'firebase/database';
import React, { useState, useEffect } from 'react';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVqBGyGBOQR9gGN9Oyind7ZRetfWE1tIA",
  authDomain: "scheduler-6f9ba.firebaseapp.com",
  databaseURL: "https://scheduler-6f9ba-default-rtdb.firebaseio.com",
  projectId: "scheduler-6f9ba",
  storageBucket: "scheduler-6f9ba.appspot.com",
  messagingSenderId: "389261566232",
  appId: "1:389261566232:web:bba29c682d56b2b4e17e6d",
  measurementId: "G-D57CH86J9K"
};

export const setData = (path, value) => {
    set(ref(database, path), value)
};


export const useData = (path, transform) => {
    //Display data
    const [data, setData] = useState();
    //No data is available yet
    const [loading, setLoading] = useState(true);
    //Something went wrong
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
};





// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const analytics = getAnalytics(firebase);
const auth = getAuth(firebase);
onAuthStateChanged(auth, user => {
  // Check for user status
});

