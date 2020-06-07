import Menu from "./components/Menu";
import Page from "./pages/Page";
import React from "react";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Spam from "./pages/Spam";
import Sites from "./pages/Sites";
import Home from "./pages/Home";
import SpamKeywords from "./pages/SpamKeywords";
import MostCalled from "./pages/MostCalled";
import KeywordReport from "./pages/KeywordReport";
import Location from "./pages/Location";
import Settings from "./pages/Settings";
import Login from "./Auth/Login";
import useAuth from "./hooks/useAuth";
import UserContext from "./contexts/UserContext";
import Signup from "./Auth/Signup";
import AllSpam from "./pages/AllSpam";

const App = () => {
  const [user, setUser] = useAuth();

  return (
    <IonApp>
      <IonReactRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/page/:name" component={Page} exact />
              <Route path="/spam" component={Spam} exact />
              <Route path="/home" component={Home} exact />
              <Route path="/sites" component={Sites} exact />
              <Route path="/keywords" component={SpamKeywords} exact />
              <Route path="/all" component={AllSpam} exact />
              <Route path="/location-filter" component={Location} exact />
              <Route path="/reports/most-called" component={MostCalled} exact />
              <Route path="/reports/keywords" component={KeywordReport} exact />
              <Route path="/settings" component={Settings} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/sign-up" component={Signup} exact />
              <Redirect from="/" to="/page/Inbox" exact />
            </IonRouterOutlet>
          </IonSplitPane>
        </UserContext.Provider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
