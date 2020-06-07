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
    return () => unsubscribe();
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

  function handleAddUser() {
    if (!user) {
      console.log("Waiting to Connect...");
    } else {
      const { keyword } = values;
      const linkRef = firebase.db.collection("users").doc(user.uid);

      const newUser = {
        id: user.uid,
        name: user.displayName,

        email: user.email,
        emailVerified: user.emailVerified,
        keywords: [],

        created: Date.now(),
      };

      linkRef.get().then((doc) => {
        if (!doc.exists) {
          firebase.db.collection("users").doc(user.uid).add(newUser);
        } else {
          console.log("user already added");
        }
      });
    }
  }

  function getKeywords() {
    if (!user) {
      console.log("waiting to connect");
    } else {
      return firebase.db
        .collection("users")
        .where("id", "==", `${user.uid}`)

        .onSnapshot(handleSnapshot);
    }
  }

  function handleSnapshot(snapshot) {
    const keywords = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setKeywords(keywords);
    console.log(keywords);
  }

  function handleAddKeyword() {
    handleAddUser();
    if (!user) {
      console.log("Waiting to Connect...");
    } else {
      const linkRef = firebase.db.collection("users").doc(user.uid);
      linkRef.get().then((doc) => {
        if (doc.exists) {
          const previousKeywords = doc.data().keywords;
          const newKeyword = values.keyword;
          const updatedKeywords = [newKeyword, ...previousKeywords];
          linkRef.update({ keywords: updatedKeywords });
        } else {
          console.log("user already added");
        }
      });

      console.log("Keyword Added");
    }
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
