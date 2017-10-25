import React from 'react';
import User from './user-component';
import LoginForm from './login-form';
import Account from './account';
import SignUp from './sign-up';
import { connect } from 'react-redux';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    userData: state.userData,
  }
}

class AppContainer extends React.Component {
  constructor(props, context) {
    super();
  }

  render() {
    var isAuthenticated = this.props.userData && this.props.userData.isAuthenticated;
    var isUnauthenticatedRoute = document.location.pathname == '/login' || document.location.pathname == '/sign-up';
    return (
      <div>
        <User />
        {!isAuthenticated && !isUnauthenticatedRoute && <Redirect to="/login" push />}
        <Switch>
          <Route path="/login" component={LoginForm}/>
          <Route path="/sign-up" component={SignUp}/>
          <Route path="/account" component={Account}/>
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps, null, null, {
  pure: false
})(AppContainer);
