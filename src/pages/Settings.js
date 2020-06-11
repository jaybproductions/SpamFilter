import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonCol,
  IonRow,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonItem,
  IonList,
  IonButton,
} from "@ionic/react";
import React from "react";
import firebase from "../firebase";
import toast from "../helpers/toast";

import "./Page.css";

const Settings = (props) => {
  async function LogoutUser() {
    try {
      await firebase.logout();
      props.history.push("/");
    } catch (err) {
      console.error("Unable to log out", err);
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"></IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>Edit Your Profile</IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>Name</IonItem>
                    <IonItem>Phone Number</IonItem>
                    <IonItem>Email Address</IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard>
                <IonCardHeader>Top Blocked Keywords</IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>marketing</IonItem>
                    <IonItem>websites</IonItem>
                    <IonItem>seo</IonItem>
                    <IonItem>backlinks</IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonCol>
            <IonRow>
              <IonButton onClick={LogoutUser}>Logout</IonButton>
            </IonRow>
          </IonCol>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
