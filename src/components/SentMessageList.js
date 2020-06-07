import React from "react";
import { IonList, IonItem, IonButton } from "@ionic/react";

const SentMessageList = ({ email, message, index, isBlocked }) => {
  function sendBlockedEmail() {}
  return (
    <IonList>
      <IonItem>{email}</IonItem>
      <IonItem>{message}</IonItem>
    </IonList>
  );
};

export default SentMessageList;
