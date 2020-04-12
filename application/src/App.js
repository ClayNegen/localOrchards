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
import PageNotFound from "./components/PageNotFound";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
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
