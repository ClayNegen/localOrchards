import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Maps from "./components/Maps";
import Home from "./components/Home";
import Profile from "./components/Profile";
import UPick from "./components/U-Pick";
import Activity from "./components/Activity";
import PageNotFound from "./components/PageNotFound";
import SignUpPage from "./components/SignUpPage";
import Orchard from "./components/Orchard";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/upick">
            <UPick />
          </Route>
          <Route path="/upick/:id" component={Orchard} />
          <Route path="/activity">
            <Activity />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/maps">
            <Maps />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/404">
            <PageNotFound />
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
