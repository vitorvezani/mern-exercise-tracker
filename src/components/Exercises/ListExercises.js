import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={`/edit/${props.exercise._id}`}>edit</Link> | <a href="/" onClick={(e) => { e.preventDefault(); props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

class ListExercises extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch(err => {
        toast.error(`Operation failed: ${err.message}`)
      })
  }

  deleteExercise(id) {
    axios.delete(`http://localhost:5000/api/exercises/${id}`)
      .then(res => toast(`Exercise ${res.data.description} deleted successfully!`))
      .catch(err => {
        toast.error(`Operation failed: ${err.message}`)
      })

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(exercise => {
      return <Exercise exercise={exercise} deleteExercise={this.deleteExercise} key={exercise._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.exerciseList()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ListExercises