import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserService from '../services/user-service.js';
import { setUserData } from '../actions/index';

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

  render() {
    return (
      <div>
        <input type="text" name="username" placeholder="username" onChange={this._handleUsernameUpdate}/>
        <input type="password" name="password" placeholder="password" onChange={this._handlePasswordUpdate}/>
        <button className="float-right" onClick={this._handleSubmission}>Submit</button>
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
        this.setUserData(result);
      })
  }
}

export default connect(undefined, mapDispatchToProps)(LoginForm);
