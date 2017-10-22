import React from 'react';
import User from './user-component';
import LoginForm from './login-form';
import SignUp from './sign-up';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';

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
        <User />
        {isAuthenticated && <div>YOUR LOGGED IN!!!</div>}
        <Switch>
          <Route path="/login" component={LoginForm}/>
          <Route path="/sign-up" component={SignUp}/>
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps, null, null, {
  pure: false
})(AppContainer);
