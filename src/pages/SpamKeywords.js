import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
} from "@ionic/react";
import React from "react";
import KeywordList from "../components/KeywordList";
import useForm from "../hooks/useForm";
import validateAddKeyword from "../validators/validateAddKeyword";
import firebase from "../firebase";
import UserContext from "../contexts/UserContext";

import "./Page.css";

const SpamKeywords = () => {
  const [keywords, setKeywords] = React.useState([]);
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    const unsubscribe = getKeywords();
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  const INITIAL_STATE = {
    keyword: "",
  };
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validateAddKeyword,
    handleAddKeyword
  );

  function handleAddKeyword() {
    if (!user) {
      console.log("Waiting to Connect...");
    } else {
      const { keyword } = values;
      const newUser = {
        id: user.uid,
        name: user.displayName,

        email: user.email,
        emailVerified: user.emailVerified,
        keywords: [...keywords, keyword],

        created: Date.now(),
      };
      firebase.db.collection("users").doc(user.uid).set(newUser);
      console.log("User added to database");
    }
  }

  function getKeywords() {
    return firebase.db.collection("users").onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot) {
    const keywords = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setKeywords(keywords);
    console.log(keywords);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Keywords</IonTitle>

          <IonItem lines="full">
            <IonLabel position="floating">Add Keyword</IonLabel>
            <IonInput
              name="keyword"
              type="text"
              required
              value={values.keyword}
              onIonChange={handleChange}
            ></IonInput>
            <IonButton onClick={handleSubmit}>Add</IonButton>
          </IonItem>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"></IonTitle>
          </IonToolbar>
        </IonHeader>
        {Object.values(keywords).map((keyword, index) => (
          <>
            <KeywordList key={index} keyword={keyword} index={index} />
          </>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default SpamKeywords;
