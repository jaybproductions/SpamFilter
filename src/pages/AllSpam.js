import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonButton,
  IonLoading,
} from "@ionic/react";
import React from "react";
import axios from "axios";
import firebase from "../firebase";
import UserContext from "../contexts/UserContext";

import "./Page.css";
import MessageList from "../components/MessageList";

const AllSpam = () => {
  const { user } = React.useContext(UserContext);

  const [message, setMessage] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [keywords, setKeywords] = React.useState([]);
  const [allMessages, setAllMessages] = React.useState([]);
  const [isBlocked, setIsBlocked] = React.useState(false);
  const [gotData, setGotData] = React.useState(false);

  React.useEffect(() => {
    getEmails();
    getKeywords();
  }, [gotData]);

  async function getEmails() {
    axios({
      url: `http://localhost:80/contactforms/email`,
      method: "get",
      headers: { "Content-Type": "application/json" },
      //es-lint disable next line
    }).then((res) => {
      console.log(res);
      console.log(res.data);
      var data = res.data;

      console.log(
        "email: " + res.data[0].email,
        "message: " + res.data[0].message
      );

      setMessage(res.data[0].message);
      setEmail(res.data[0].email);
      setAllMessages(data);
      console.log(allMessages);
    });
  }

  async function getKeywords() {
    if (!user) {
      console.log("waiting to connect");
    } else {
      setGotData(true);
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

  function checkGet() {
    var keywordToCheck = message.includes(keywords);
    if (keywordToCheck) {
      setIsBlocked(true);
      return true;
    } else {
      setIsBlocked(false);
      return false;
    }
  }

  function sendOrNot() {
    console.log(isBlocked);
    if (checkGet()) {
      console.log("Email Blocked");
    } else {
      firebase.db
        .collection("mail")
        .add({
          to: "jayblar@gmail.com",
          message: {
            subject: "New Contact Form",
            text: "",
            html: `email: ${email} message: ${message}`,
          },
          isEmailBlocked: isBlocked,
        })
        .then(() => console.log("Queued email for delivery!"));
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>View All Spam</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"></IonTitle>
          </IonToolbar>
        </IonHeader>

        {user ? (
          <>
            {allMessages.map((message, index) => {
              return (
                <>
                  <MessageList
                    key={index}
                    message={message.message}
                    email={message.email}
                    isBlocked={isBlocked}
                  />
                </>
              );
            })}
          </>
        ) : (
          <IonLoading isOpen={!user} message={"loading..."} />
        )}

        <IonButton onClick={sendOrNot}>TEST BLOCKER</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AllSpam;
