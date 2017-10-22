import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    userData: state.userData,
  }
}

class UserComponent extends React.Component {
  render() {
    var userData = this.props.userData || {};
    var loggedOutState = (
      <Link to='/login'>Login</Link>
    );

    var loggedInState = (
      <div className="is-logged-in">Hello {userData.username}</div>
    )

    var userComponent = userData.isAuthenticated ? loggedInState : loggedOutState;

    return ReactDOM.createPortal(
      userComponent,
      document.getElementById('user'),
    );
  }
}

export default connect(mapStateToProps, undefined)(UserComponent);
