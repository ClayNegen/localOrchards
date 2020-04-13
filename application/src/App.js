import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Blog from "./components/Blog";
import Maps from "./components/Maps";
import Home from "./components/Home";
import Profile from "./components/Profile";
import UPick from "./components/U-Pick";
import Activity from "./components/Activity";
import BusinessForm from "./components/BusinessForm";
import PageNotFound from "./components/PageNotFound";
import SignUpPage from "./components/SignUpPage";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/upick">
            <UPick />
          </Route>
          <Route path="/activity">
            <Activity />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/blog">
            <Blog />
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
