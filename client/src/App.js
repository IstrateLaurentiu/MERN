import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import Alert from "./components/layout/Alert";
import { loadUser } from "./redux/actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import Activate from "./components/auth/Activate";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar></Navbar>
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/profiles" component={Profiles}></Route>
              <Route exact path="/profile/:id" component={Profile}></Route>
              <Route exact path="/activate/:token" component={Activate}></Route>
              <PrivateRoute
                exact
                path="/dashboard"
                component={Dashboard}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path="/posts"
                component={Posts}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/posts/:id"
                component={Post}
              ></PrivateRoute>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
