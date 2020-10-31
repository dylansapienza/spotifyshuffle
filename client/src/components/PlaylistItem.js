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
  } from "@ionic/react";
  import "@ionic/core/css/ionic.bundle.css";


  function PlaylistItem(props) {
    console.log(props)
    return(
      <IonItem button onClick={()=> console.log(props.playlist.name)}>
          {props.playlist.images ? (
          <IonThumbnail slot="start">
            {props.playlist.images[0] ? (
              <img src={props.playlist.images[0].url} alt="icon"></img>
            ) : (
              <img src="https://i.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg"></img>
            )}
           </IonThumbnail>
          ): (
            <div></div>
          )}
        <IonLabel>
          <h2>{props.playlist.name}</h2>
        </IonLabel>
      </IonItem>
    )
  }
export default PlaylistItem;