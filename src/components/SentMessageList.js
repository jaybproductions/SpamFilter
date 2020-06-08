import React from "react";
import {
  IonList,
  IonItem,
  IonButton,
  IonCard,
  IonCardContent,
} from "@ionic/react";

const SentMessageList = ({ email, message, index, isBlocked }) => {
  return (
    <IonCard>
      <IonCardContent>
        <IonList>
          <IonItem>{email}</IonItem>
          <IonItem>{message}</IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default SentMessageList;
