import React from "react";
import { IonList, IonItem, IonCard, IonCardContent } from "@ionic/react";

const KeywordList = ({ keyword, index }) => {
  return (
    <IonCard>
      <IonCardContent>
        <IonItem lines="none" key={keyword.id}>
          {keyword}
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export default KeywordList;
