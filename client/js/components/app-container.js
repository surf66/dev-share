import React from 'react';
import User from './user-component';
import LoginForm from './login-form';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    userData: state.userData,
  }
}

class AppContainer extends React.Component {
  constructor() {
    super();
  }

  render() {
    var isAuthenticated = this.props.userData && this.props.userData.isAuthenticated;
    return (
      <div>
        {!isAuthenticated && <LoginForm />}

        <User />
      </div>
    );
  }
}

export default connect(mapStateToProps, undefined)(AppContainer);
