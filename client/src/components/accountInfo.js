import React, {useState, useEffect} from 'react'
import {IonButton, IonList, IonCard, IonGrid, IonCol, IonRow, IonContent} from '@ionic/react'
import axios from 'axios'
import PlaylistItem from './PlaylistItem'


const login_url = "http://localhost:8888/login";

function App(props) {


  useEffect(() => {
      getUserInfo()
      getUserPlaylists()
  }, [])


  const access_token = new URLSearchParams(props.location.search).get("access_token");

  const data = {access_token : access_token}

  const [username, setUsername] = useState("")
  const [playlists, setPlaylists] = useState([])

  function getUserInfo(){
    axios.post('http://localhost:8888/api/getUserInfo', data, {headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) =>{
        console.log(res)
        setUsername(res.data.display_name)
    })
    .catch((error)=>{
        console.log(error)
    });
  }

  function getUserPlaylists(){
    axios.post('http://localhost:8888/api/getUserPlaylists', data, {headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) =>{
        console.log(res.data.items)
        setPlaylists(res.data.items)
    })
    .catch((error)=>{
        console.log(error)
    });
  }


  return (
    <div className="App">
      <h2>Welcome, {username}!</h2>
      <h3>Click Which Playlist You Would Like to Shuffle!</h3>
      <IonContent style={{height:"85vh"}}>
      <IonGrid>
          <IonRow>
      <IonCol></IonCol>
      <IonCol>
        <IonCard>
        
            <IonList>
                    {playlists.map((playlist) => (
                        <PlaylistItem playlist={playlist} />
                     ))}
            </IonList>

        </IonCard>

        </IonCol>
        <IonCol></IonCol>
        </IonRow>
       </IonGrid>
       </IonContent>
    </div>
  );
}

export default App;
