import React from 'react'
import {BrowserRouter, Route} from "react-router-dom"
import {IonApp, IonMenu} from '@ionic/react'
import "@ionic/core/css/ionic.bundle.css";
import logo from './logo.svg';
import './App.css';
import testAPI from './components/testAPI'
import accountInfo from './components/accountInfo'
function App() {
  return (
    <BrowserRouter>
      <IonApp>
        <Route exact path="/" component={testAPI} />
        <Route path="/accountinfo" component={accountInfo} />
      </IonApp>
    </BrowserRouter>
  );
}
export default App;
