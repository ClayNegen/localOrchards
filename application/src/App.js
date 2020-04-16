import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import RegisterRoute from "./RegisterRoute";
//Components
import Maps from "./components/Maps";
import Home from "./components/Home";
import Profile from "./components/Profile";
import UPick from "./components/U-Pick";
import Activity from "./components/Activity";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import SignUpPage from "./components/SignUpPage";
import UserSignUp from "./components/UserSignUp";
import Orchard from "./components/Orchard";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/upick" component={UPick}></Route>
            <Route path="/upick/:id" component={Orchard} />
            <Route exact path="/activity" component={Activity}></Route>
            <PrivateRoute
              exact
              path="/profile"
              component={Profile}
            ></PrivateRoute>
            <RegisterRoute
              exact
              path="/signup"
              component={SignUpPage}
            ></RegisterRoute>
            <Route exact path="/usersignup" component={UserSignUp}></Route>
            <Route exact path="/maps" component={Maps}></Route>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/404" component={PageNotFound}></Route>
            <Route>
              <Redirect to="/404" />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}
