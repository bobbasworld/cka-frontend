import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './components/common/PrivateRoute';

import Home from './components/Home/Home';
import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';
import Dashboard from './containers/Dashboard/Dashboard';
import SelectLevel from './containers/SelectLevel/SelectLevel';
import Lessons from './containers/Lessons/Lessons';
import LessonDetail from './containers/LessonDetail/LessonDetail';
import Bites from './containers/Bites/Bites';
import BiteDetail from './containers/BiteDetail/BiteDetail';
import Navbar from './components/Navbar/Navbar';
import Newsfeed from './containers/Newsfeed/Newsfeed';
import Markets from './containers/Markets/Markets';

import * as actions from './store/actions/auth';
import axios from 'axios'


class App extends Component {

  state = {
    user: {}
  }

  componentDidMount() {
    console.log("COMPONENT DID MOUNT!")
    this.props.onTryAutoSignup()
  }


  render() {
    return (
      <Fragment>
        <Router>
          <Navbar />
          <div className="App" >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/selectlevel" component={SelectLevel} />
              <Route exact path="/lessons" component={Lessons} />
              <Route exact path="/lessons/:title" component={LessonDetail} />
              <Route exact path="/bites" component={Bites} />
              <Route exact path="/bites/:title" component={BiteDetail} />
              <Route exact path="/news" component={Newsfeed} />
              <Route exact path="/markets" component={Markets} />
              {/* <Home /> */}
            </Switch>
          </div>
        </Router>
      </Fragment>
    );
  }
}

// export default App;

// const mapStateToProps = state => {
//   return {
//     // isAuthenticated: state.token !== null
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
    // onLogout: () => dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps)(App);
