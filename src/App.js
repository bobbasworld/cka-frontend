import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './components/common/PrivateRoute';

import Home from './components/Home/Home';
import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import SelectLevel from './containers/SelectLevel/SelectLevel';

import * as actions from './store/actions/auth1';


class App extends Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     token: null
  //   }
  // }

  // componentDidMount() {
  //   console.log("COMPONENT DID MOUNT!")
  //   this.props.onTryAutoSignup()
  // }


  render() {
    return (
      <Router>
        <div className="App" >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/selectlevel" component={SelectLevel} />
            {/* <Home /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

// const mapStateToProps = state => {
//   return {
//     // isAuthenticated: state.token !== null
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onTryAutoSignup: () => dispatch(actions.authCheckState())
//     // onLogout: () => dispatch(actions.logout())
//   }
// }

// export default connect(null, mapDispatchToProps)(App);
