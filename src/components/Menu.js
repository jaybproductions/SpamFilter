import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import React from "react";
import { useLocation } from "react-router-dom";
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  homeOutline,
  homeSharp,
  globeSharp,
  globeOutline,
  stopCircleSharp,
  stopCircleOutline,
  closeCircleOutline,
  closeCircleSharp,
  documentSharp,
  documentTextOutline,
  documentTextSharp,
  albumsSharp,
  albumsOutline,
  trendingUpOutline,
  trendingUpSharp,
  callOutline,
  callSharp,
  mapOutline,
  mapSharp,
  settingsOutline,
  settingsSharp,
  personCircleOutline,
  personCircleSharp,
  personAddOutline,
  personAddSharp,
} from "ionicons/icons";
import "./Menu.css";
import ToggleDark from "./DarkToggle";
import UserContext from "../contexts/UserContext";

const appPagesLoggedOut = [
  {
    title: "Login",
    url: "/login",
    iosIcon: personCircleOutline,
    mdIcon: personCircleSharp,
  },

  {
    title: "Sign Up",
    url: "/sign-up",
    iosIcon: personAddOutline,
    mdIcon: personAddSharp,
  },
];

const appPagesLoggedIn = [
  {
    title: "Home",
    url: "/home",
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    title: "Sites",
    url: "/sites",
    iosIcon: globeOutline,
    mdIcon: globeSharp,
  },
  {
    title: "All Spam",
    url: "/all",
    iosIcon: closeCircleOutline,
    mdIcon: closeCircleSharp,
  },
  {
    title: "Spam Keywords",
    url: "/keywords",
    iosIcon: albumsOutline,
    mdIcon: albumsSharp,
  },
  {
    title: "Filter By Location",
    url: "/location-filter",
    iosIcon: mapOutline,
    mdIcon: mapSharp,
  },
  {
    title: "Keyword Report",
    url: "/reports/keywords",
    iosIcon: trendingUpOutline,
    mdIcon: trendingUpSharp,
  },
  {
    title: "Most Called",
    url: "/reports/most-called",
    iosIcon: callOutline,
    mdIcon: callSharp,
  },
  {
    title: "Settings",
    url: "/settings",
    iosIcon: settingsOutline,
    mdIcon: settingsSharp,
  },
];

const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

const Menu = () => {
  const location = useLocation();
  const { user } = React.useContext(UserContext);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Spam Filter</IonListHeader>
          <IonNote>Your #1 Option for filtering spam.</IonNote>
          {user ? (
            <>
              {appPagesLoggedIn.map((appPage, index) => {
                return (
                  <IonMenuToggle key={index} autoHide={false}>
                    <IonItem
                      className={
                        location.pathname === appPage.url ? "selected" : ""
                      }
                      routerLink={appPage.url}
                      routerDirection="none"
                      lines="none"
                      detail={false}
                    >
                      <IonIcon
                        slot="start"
                        ios={appPage.iosIcon}
                        md={appPage.mdIcon}
                      />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                );
              })}
            </>
          ) : (
            <>
              {appPagesLoggedOut.map((appPage, index) => {
                return (
                  <IonMenuToggle key={index} autoHide={false}>
                    <IonItem
                      className={
                        location.pathname === appPage.url ? "selected" : ""
                      }
                      routerLink={appPage.url}
                      routerDirection="none"
                      lines="none"
                      detail={false}
                    >
                      <IonIcon
                        slot="start"
                        ios={appPage.iosIcon}
                        md={appPage.mdIcon}
                      />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                );
              })}
            </>
          )}
        </IonList>

        <ToggleDark />
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
