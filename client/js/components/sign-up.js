import React from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
import UserService from '../services/user-service.js';

function mapStateToProps(state) {
  return {
    userData: state.userData,
  }
}

class SignUpForm extends React.Component {
  constructor() {
    super();

    this.state = {
      formValues: {},
      errors: {}
    };

    this._handleInputUpdate = this._handleInputUpdate.bind(this);
    this._handleSubmission = this._handleSubmission.bind(this);
  }

  componentWillMount() {
    if (this.props.userData && this.props.userData.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="col-7-sub-medium col-3-medium col-centered sign-up-form text-center">
        <h4>Sign Up</h4>
        <div className={`${this.state.errors.username ? 'has-error' : ''}`}>
          <input type="text" name="username" placeholder="username" onChange={this._handleInputUpdate} className="text-center"/>
          <span className="error-message text-light-red">{this.state.errors.username && this.state.errors.username[0]}</span>
        </div>
        <div className={`${this.state.errors.email ? 'has-error' : ''}`}>
          <input type="email" name="email" placeholder="email" onChange={this._handleInputUpdate} className="text-center"/>
          <span className="error-message text-light-red">{this.state.errors.email && this.state.errors.email[0]}</span>
        </div>
        <div className={`${this.state.errors.password ? 'has-error' : ''}`}>
          <input type="password" name="password" placeholder="password" onChange={this._handleInputUpdate} className="text-center"/>
          <span className="error-message text-light-red">{this.state.errors.password && this.state.errors.password[0]}</span>
        </div>
        <button onClick={this._handleSubmission}>Submit</button>
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
        this.props.history.push("/login");
      })
      .fail((result) => {
        var error = JSON.parse(result.responseText).error;
        if (error.code == "INVALID_PASSWORD") {
          return this.setState({errors: {password: [error.message]}});
        }
        this.setState({errors: error.details.messages});
      });
  }
}

export default connect(mapStateToProps, null)(SignUpForm);
