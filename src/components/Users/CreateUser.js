import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { handleError } from '../Common/error_handling';

class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRepeatPassword = this.onChangeRepeatPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      name: '',
      email: '',
      password: '',
      repeatPassword: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeRepeatPassword(e) {
    this.setState({
      repeatPassword: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      repeatPassword: this.state.repeatPassword
    }

    axios.post('http://localhost:5000/api/auth/register', user)
      .then(res => toast(`User ${res.data.username} created successfully!`))
      .catch(err => handleError(err))
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}/>
            <label>Username: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}/>
            <label>Email: </label>
            <input type="email"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}/>
            <label>Password: </label>
            <input type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword} />
            <label>Repeat Password: </label>
            <input type="password"
              required
              className="form-control"
              value={this.state.repeatPassword}
              onChange={this.onChangeRepeatPassword} />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}

export default CreateUser