import React from "react";
import { IonList, IonItem } from "@ionic/react";

const MessageList = ({ email, message, index, isBlocked }) => {
  return (
    <IonList>
      <IonItem>{email}</IonItem>
      <IonItem>{message}</IonItem>
      <IonItem>{isBlocked}</IonItem>
    </IonList>
  );
};

export default MessageList;
