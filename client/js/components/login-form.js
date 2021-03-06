import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserService from '../services/user-service.js';
import { setUserData } from '../actions/index';
import { Link, Switch, Route } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    userData: state.userData,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    setUserData: bindActionCreators(setUserData, dispatch)
  })
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this._handleUsernameUpdate = this._handleUsernameUpdate.bind(this);
    this._handlePasswordUpdate = this._handlePasswordUpdate.bind(this);
    this._handleSubmission = this._handleSubmission.bind(this);
    this.setUserData = props.setUserData.bind(this);
  }

  componentWillMount() {
    if (this.props.userData && this.props.userData.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="col-5-sub-medium col-3-medium col-centered login-form text-center">
        <h4>Login</h4>
        <input type="text" name="username" placeholder="username" onChange={this._handleUsernameUpdate} className="text-center"/>
        <input type="password" name="password" placeholder="password" onChange={this._handlePasswordUpdate} className="text-center"/>
        <button onClick={this._handleSubmission}>Submit</button>
        <Link to='/sign-up'>Sign up</Link>
      </div>
    );
  }

  _handleUsernameUpdate(e) {
    this.setState({username: e.target.value})
  }

  _handlePasswordUpdate(e) {
    this.setState({password: e.target.value})
  }

  _handleSubmission() {
    UserService.login(this.state.username, this.state.password)
      .then((result) => {
        this.setUserData(result);
        return UserService.getProfileData(result.userId, result.id);
      })
      .then((result) => {
        result.isAuthenticated = true;
        delete result.id;
        this.setUserData(result);
        this.props.history.push("/");
      })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
