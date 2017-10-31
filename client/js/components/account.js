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

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: {}
    }

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleSubmission = this._handleSubmission.bind(this);
  }

  render() {
    return (
      <div className="col-8-sub-medium col-centered text-center account-area">
        <h4>Account</h4>
        <img className="profile-pic" src={`/images/${this.props.userData.id}/avatar.png`} />
        <div className="row">
          <div className="col-6-sub-medium">
            <div className="field-container">
              <label htmlFor="first-name">Username</label>
              <input type="text" id="username" name="username" defaultValue={this.props.userData.username} onChange={this._handleInputChange}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6-sub-medium">
            <div className="field-container">
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" name="first-name" defaultValue={this.props.userData['first-name']} onChange={this._handleInputChange}/>
            </div>
          </div>
          <div className="col-6-sub-medium">
            <div className="field-container">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" name="last-name" defaultValue={this.props.userData['last-name']} onChange={this._handleInputChange}/>
            </div>
          </div>
        </div>
        <div className="field-container">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" defaultValue={this.props.userData.email} onChange={this._handleInputChange}/>
        </div>
        <button onClick={this._handleSubmission}>Submit</button>
      </div>
    );
  }

  _handleInputChange(e) {
    var updatedValues = this.state.formValues;
    updatedValues[e.target.name] = e.target.value;
    this.setState({formValues: updatedValues});
  }

  _handleSubmission() {
    UserService.updateUser(this.props.userData.userId, this.state.formValues, this.props.userData.id)
      .then((result) => {
        this.props.setUserData(result);
      })
      .fail((result) => {
        var error = result.responseJSON.error;
        this.setState({errors: error.details.messages});
      });
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
