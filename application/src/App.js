import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import decode from "jwt-decode";
import Maps from "./components/Maps";
import Home from "./components/Home";
import Profile from "./components/Profile";
import UPick from "./components/U-Pick";
import Activity from "./components/Activity";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import SignUpPage from "./components/SignUpPage";
import Orchard from "./components/Orchard";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

const checkAuth = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!token || !refreshToken) {
    return false;
  }

  try {
    const { expDate } = decode(refreshToken);

    if (expDate < new Date.getTime() / 10000) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

//User Auth
//https://reacttraining.com/react-router/web/example/auth-workflow
function AuthRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/upick">
            <UPick />
          </Route>
          <Route path="/upick/:id" component={Orchard} />
          <Route path="/activity">
            <Activity />
          </Route>
          <AuthRoute path="/profile">
            <Profile />
          </AuthRoute>
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
