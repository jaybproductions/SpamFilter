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
import SentMessageList from "../components/SentMessageList";
import BlockedMessageList from "../components/BlockedMessageList";

const AllSpam = () => {
  const { user } = React.useContext(UserContext);
  const [message, setMessage] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [allBlockedMessages, setAllBlockedMessages] = React.useState([]);
  const [allSentMessages, setAllSentMessages] = React.useState([]);
  const [isBlocked, setIsBlocked] = React.useState(false);
  const [gotData, setGotData] = React.useState(null);

  React.useEffect(() => {
    getBlockedEmails();
    getSentEmails();
  }, [!gotData]);

  async function getBlockedEmails() {
    if (!user) {
      console.log("waiting to connect");
    } else {
      await axios({
        url: `http://localhost:81/users/${user.uid}/blockedemails`,
        method: "get",
        headers: { "Content-Type": "application/json" },
        //es-lint disable next line
      }).then((res) => {
        try {
          var data = res.data;
          setAllBlockedMessages(data);
        } catch (err) {
          console.log("no sent messages");
        }
      });
    }
  }

  async function getSentEmails() {
    if (!user) {
      console.log("waiting to connect");
    } else {
      await axios({
        url: `http://localhost:81/users/${user.uid}/sentemails`,
        method: "get",
        headers: { "Content-Type": "application/json" },
        //es-lint disable next line
      }).then((res) => {
        try {
          var data = res.data;

          setAllSentMessages(data);

          setGotData(true);
        } catch (err) {
          console.log("no sent messages");
        }
      });
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
            <IonTitle>Blocked Messages</IonTitle>
            {allBlockedMessages.map((message, index) => {
              return (
                <>
                  <BlockedMessageList
                    key={index}
                    message={message.message}
                    email={message.email}
                    isBlocked={isBlocked}
                  />
                </>
              );
            })}

            <IonTitle>Sent Messages</IonTitle>
            {allSentMessages.map((message, index) => {
              return (
                <>
                  <SentMessageList
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
      </IonContent>
    </IonPage>
  );
};

export default AllSpam;
