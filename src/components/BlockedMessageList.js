import React from "react";
import { IonList, IonItem, IonButton } from "@ionic/react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

const BlockedMessageList = ({ email, message, index, isBlocked }) => {
  const { user } = React.useContext(UserContext);
  const [sent, setSent] = React.useState(false);

  function sendBlockedEmail() {
    if (!user) {
      console.log("waiting to connect");
    } else {
      axios({
        url: `http://localhost:81/users/${user.uid}/sendanyway`,
        method: "post",
        headers: { "Content-Type": "application/json" },
        //es-lint disable next line
        data: {
          emailToSend: email,
          messageToSend: message,

          email: user.email,
          emailVerified: user.emailVerified,
          keywords: [],

          created: Date.now(),
        },
      }).then((res) => {});
    }

    setSent(true);
  }

  return (
    <IonList>
      <IonItem>{email}</IonItem>
      <IonItem>{message}</IonItem>
      <IonItem>
        <IonButton onClick={sendBlockedEmail} disabled={sent}>
          Send Anyway
        </IonButton>
      </IonItem>
    </IonList>
  );
};

export default BlockedMessageList;
