import React from "react";
import { IonList, IonItem } from "@ionic/react";

const KeywordList = ({ keyword, index }) => {
  return (
    <IonList>
      {keyword.keywords.map((keyword, index) => (
        <>
          <IonItem key={keyword.id}>{keyword}</IonItem>
        </>
      ))}
    </IonList>
  );
};

export default KeywordList;
