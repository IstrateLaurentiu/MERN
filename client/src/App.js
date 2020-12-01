import React, { Fragment } from "react";
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

function App() {
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
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
