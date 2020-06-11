import React from "react";
import {
  IonList,
  IonItem,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { atCircleOutline } from "ionicons/icons";

const KeywordList = ({ keyword, index }) => {
  return (
    <IonCard>
      <IonCardContent>
        <IonItem lines="none" key={keyword.id}>
          {keyword}
        </IonItem>
        <IonButton color="blocked-emails">
          <IonIcon /> Coming Soon...
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default KeywordList;
