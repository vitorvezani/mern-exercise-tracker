import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "../components/UI/Navbar"
import ListExercises from "../components/Exercises/ListExercises";
import EditExercise from "../components/Exercises/EditExercise";
import CreateExercise from "../components/Exercises/CreateExercise";
import CreateUser from "../components/Users/CreateUser";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {isAuthenticated} from '../auth'

const PrivateRoute = ({component: Component, ...rest}) => {
  return <Route
  { ...rest } 
  render = {props =>
    isAuthenticated() ? (
      <Component { ...props}/>
    ) : (
      <Redirect to={{ pathname: "/", state: { from: props.location } }} />
    )
  } 
  />
}

function App() {
  return (
    <Router>
      <div className="container">
        <ToastContainer />
        <Navbar />
        <br />
        <Switch>
          <Route exact path="/" component={ListExercises} />
          <PrivateRoute exact path="/exercises" component={ListExercises} />
          <PrivateRoute exact path="/exercises/edit/:id" component={EditExercise} />
          <PrivateRoute exact path="/exercises/create" component={CreateExercise} />
          <PrivateRoute exact path="/users/create" component={CreateUser} />
        </Switch>
        <p><small>You are running this application in <b>{process.env.NODE_ENV}</b> mode</small></p>
        <p><small>Public URL is: <b>{process.env.PUBLIC_URL}</b></small></p>
      </div>
    </Router>
  );
}

export default App;
