import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home';
import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          {/* <Home /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
