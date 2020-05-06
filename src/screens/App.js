import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "../components/UI/Navbar"
import ListExercises from "../components/Exercises/ListExercises";
import EditExercise from "../components/Exercises/EditExercise";
import CreateExercise from "../components/Exercises/CreateExercise";
import CreateUser from "../components/Users/CreateUser";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <Router>
      <div className="container">
        <ToastContainer />
        <Navbar />
        <br />
        <Route path="/" exact component={ListExercises} />
        <Route path="/exercises" exact component={ListExercises} />
        <Route path="/exercises/edit/:id" component={EditExercise} />
        <Route path="/exercises/create" component={CreateExercise} />
        <Route path="/users/create" component={CreateUser} />
        <p><small>You are running this application in <b>{process.env.NODE_ENV}</b> mode</small></p>
        <p><small>Public URL is: <b>{process.env.PUBLIC_URL}</b></small></p>
      </div>
    </Router>
  );
}

export default App;
