import React, { useState } from "react";
import {
    IonApp,
    IonHeader,
    IonTitle,
    IonCard,
    IonToolbar,
    IonCardContent,
    IonCardTitle,
    IonPage,
    IonContent,
    IonCardHeader,
    IonCardSubtitle,
    IonButton,
    IonText,
    IonMenu,
    IonList,
    IonItem,
    IonSlider,
    IonLabel,
    IonInput,
    IonToggle,
    IonRadio,
    IonCheckbox,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonAvatar,
    IonModal,
    IonFab,
    IonFabButton,
    IonProgressBar,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonVirtualScroll,
    IonItemDivider,
    IonThumbnail,
    IonTextarea,
    IonRange,
    IonRow,
    IonGrid,
    IonCol,
  } from "@ionic/react";
  import "@ionic/core/css/ionic.bundle.css";
  import axios from 'axios'


  function PlaylistItem(props) {

    const [showModal, setShowModal] = useState(false)

    const access_token = props.access_token
  
    const playlist_name = props.playlist.name

    const data = {access_token: access_token, playlist_id: props.playlist.id, user_id: props.user_id, playlist_name: playlist_name}

    function shufflePlaylist(){
      axios
      .post("http://localhost:8888/api/shuffle", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.items);
        //setPlaylists(res.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
    
    }

    console.log(props)
    return(
      <>
      <IonModal isOpen={showModal} cssClass='my-custom-class'>
        <div style={{paddingTop: "50px", paddingRight: "30px", paddingBottom: "50px", paddingLeft: "30px"}}>
        {props.playlist.images[0] ? (
          
              <img src={props.playlist.images[0].url} height="200" width="200" style={{display: "block", marginLeft: "auto", marginRight: "auto"}} alt="Cover"/>
            ) : (
              <img src="https://i.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg" alt="icon"></img>
            )}
          
        
        <h2 style={{textAlign:"center"}}>{props.playlist.name}</h2>
        <p style={{textAlign:"center"}}>{props.playlist.description}</p>
        <IonGrid>
        <IonRow>
          <IonCol/>
          <IonCol>
        <IonButton color="success" onClick={() => shufflePlaylist()}>Shuffle Playlist</IonButton>
        </IonCol>
        <IonCol/>
        </IonRow>
        </IonGrid>
        </div>
        <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
  

      </IonModal>
      <IonItem button onClick={()=> setShowModal(true)}>
          {props.playlist.images ? (
          <IonThumbnail slot="start">
            {props.playlist.images[0] ? (
              <img src={props.playlist.images[0].url} alt="icon"></img>
            ) : (
              <img src="https://i.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg" alt="icon"></img>
            )}
           </IonThumbnail>
          ): (
            <div></div>
          )}
        <IonLabel>
          <h2>{props.playlist.name}</h2>
        </IonLabel>
      </IonItem>
      </>
    )
  }
export default PlaylistItem;