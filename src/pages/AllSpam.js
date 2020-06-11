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
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
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

  const [allBlockedMessages, setAllBlockedMessages] = React.useState([]);
  const [allSentMessages, setAllSentMessages] = React.useState([]);
  const [isBlocked, setIsBlocked] = React.useState(false);
  const [gotData, setGotData] = React.useState(null);
  const [checkNew, setCheckNew] = React.useState(false);

  React.useEffect(() => {
    getBlockedEmails();
    getSentEmails();
  }, [user, checkNew]);

  function checkForMail() {
    if (!checkNew) {
      setCheckNew(true);
    } else {
      setCheckNew(false);
    }
  }

  function getBlockedEmails() {
    if (!user) {
      console.log("waiting to connect");
    } else {
      axios({
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

  function getSentEmails() {
    if (!user) {
      console.log("waiting to connect");
    } else {
      axios({
        url: `http://localhost:81/users/${user.uid}/sentemails`,
        method: "get",
        headers: { "Content-Type": "application/json" },
        //es-lint disable next line
      }).then((res) => {
        try {
          var data = res.data;

          setAllSentMessages(data);
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
          <IonButton slot="end" onClick={checkForMail}>
            Check For New Mail
          </IonButton>
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
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonCard color="blocked-emails">
                    <IonCardContent>
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
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard color="sent-emails">
                    <IonCardContent>
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
                    </IonCardContent>{" "}
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </>
        ) : (
          <IonLoading isOpen={!user} message={"loading..."} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default AllSpam;
