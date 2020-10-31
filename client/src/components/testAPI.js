import React, {useState, useEffect} from 'react'
import {IonButton} from '@ionic/react'
const login_url = "http://localhost:8888/login";

function App() {

  const [response, setResponse] = useState("no response")

  useEffect(()=>{
    fetch('/testAPI')
      .then(res => res.text())
      .then(res => setResponse(res))

  });

  return (
    <div className="App">
      <h1>{response}</h1>
        <IonButton href={login_url}>Hello</IonButton>
    </div>
  );
}

export default App;
