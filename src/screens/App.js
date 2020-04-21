import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "../components/UI/Navbar"
import ListExercises from "../components/Exercises/ListExercises";
import EditExercise from "../components/Exercises/EditExercise";
import CreateExercise from "../components/Exercises/CreateExercise";
import CreateUser from "../components/Users/CreateUser";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ListExercises} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
