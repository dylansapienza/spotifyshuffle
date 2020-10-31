import React, {useState, useEffect} from 'react'
import {IonButton} from '@ionic/react'
import axios from 'axios'


const login_url = "http://localhost:8888/login";

function App(props) {

  const access_token = new URLSearchParams(props.location.search).get("access_token");

  const data = {access_token : access_token}

  function getUserInfo(){
    axios.post('http://localhost:8888/api/getUserInfo', data, {headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) =>{
        console.log(res)
    })
    .catch((error)=>{
        console.log(error)
    });
}


  return (
    <div className="App">
      <h1>{access_token}</h1>
      <IonButton onClick={()=>getUserInfo()} />
    </div>
  );
}

export default App;
