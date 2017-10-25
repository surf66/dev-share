import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Switch, Route } from 'react-router-dom';
import { clearUserData } from '../actions/index';

function mapStateToProps(state) {
  return {
    userData: state.userData,
  }
};

function mapDispatchToProps(dispatch) {
  return ({
    clearUserData: bindActionCreators(clearUserData, dispatch)
  })
};

class UserComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this._handleProfileMenuToggle = this._handleProfileMenuToggle.bind(this);
    this._handleLogOut = this._handleLogOut.bind(this);
    this.clearUserData = props.clearUserData;
  }

  render() {
    var userData = this.props.userData || {};
    var loggedOutState = (
      <Link to='/login'>Login</Link>
    );

    var loggedInState = (
      <div className="is-logged-in">
        <div className="profile" onClick={this._handleProfileMenuToggle}>
          <i className="material-icons">account_circle</i>
          <span>Hello {userData.username}</span>
        </div>
        <div className={`drop-down background-charcoal-black ${this.state.isVisible ? 'is-visible' : ''}`}>
          <ul>
            <li><Link to='/account' onClick={this._handleProfileMenuToggle}><i className="material-icons">face</i> Account</Link></li>
            <li><i className="material-icons">chat</i> Support</li>
            <li><i className="material-icons">mail_outline</i> Contact</li>
            <li onClick={this._handleLogOut}><i className="material-icons">exit_to_app</i> log out</li>
          </ul>
        </div>
      </div>
    )

    var userComponent = userData.isAuthenticated ? loggedInState : loggedOutState;

    return ReactDOM.createPortal(
      userComponent,
      document.getElementById('user'),
    );
  }

  _handleProfileMenuToggle() {
    this.setState({isVisible: !this.state.isVisible})
  }

  _handleLogOut() {
    this.clearUserData();
    this.setState({isVisible: false});
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);
