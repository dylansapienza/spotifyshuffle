import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonList,
  IonCard,
  IonGrid,
  IonCol,
  IonRow,
  IonContent,
} from "@ionic/react";
import axios from "axios";
import PlaylistItem from "./PlaylistItem";

const login_url = "http://localhost:8888/login";

function App(props) {

  const access_token = new URLSearchParams(props.location.search).get(
    "access_token"
  );

  const [username, setUsername] = useState("");
  const [id, setID] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    getUserInfo();
    getUserPlaylists();
  }, [offset]);

  const data = { access_token: access_token, offset: offset };

  function morePlaylists(){
    setOffset(offset + 50)
    // getUserPlaylists();
  }

  function prevPlaylists(){
    if(offset >= 50)
    setOffset(offset - 50)
    // getUserPlaylists();
  }

  function getUserInfo() {
    axios
      .post("http://localhost:8888/api/getUserInfo", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setID(res.data.id)
        setUsername(res.data.display_name);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getUserPlaylists() {
    axios
      .post("http://localhost:8888/api/getUserPlaylists", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.items);
        setPlaylists(res.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <h2>Welcome, {username}!</h2>
      <h3>Click Which Playlist You Would Like to Shuffle!</h3>
      <IonButton onClick={()=> prevPlaylists()} >back</IonButton>
      <IonButton onClick={()=> morePlaylists()} >forward</IonButton>
      <IonContent style={{ height: "85vh" }}>
        <IonGrid>
          <IonRow>
            <IonCol />
            <IonCol>
              <IonCard>
                <IonList>
                  {playlists.map((playlist) => (
                    <PlaylistItem playlist={playlist} access_token={access_token} user_id={id} />
                  ))}
                </IonList>
              </IonCard>
            </IonCol>
            <IonCol />
          </IonRow>
        </IonGrid>
      </IonContent>
    </div>
  );
}

export default App;
