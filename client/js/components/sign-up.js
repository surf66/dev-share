import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import UserService from '../services/user-service.js';

export default class AppContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      formValues: {}
    };

    this._handleInputUpdate = this._handleInputUpdate.bind(this);
    this._handleSubmission = this._handleSubmission.bind(this);
  }

  render() {
    return (
      <div className="col-3-sub-medium col-centered sign-up-form text-center">
        <h4>Sign Up</h4>
        <input type="text" name="username" placeholder="username" onChange={this._handleInputUpdate} className="text-center"/>
        <input type="email" name="email" placeholder="email" onChange={this._handleInputUpdate} className="text-center"/>
        <input type="password" name="password" placeholder="password" onChange={this._handleInputUpdate} className="text-center"/>
        <button className="float-right" onClick={this._handleSubmission}>Submit</button>
        <Link to='/login'>Already a member?</Link>
      </div>
    );
  }

  _handleInputUpdate(e) {
    var updatedValues = this.state.formValues;
    updatedValues[e.target.name] = e.target.value;
    this.setState({formValues: updatedValues});
  }

  _handleSubmission() {
    UserService.signUp(this.state.formValues)
      .then((result) => {

      })
  }
}
