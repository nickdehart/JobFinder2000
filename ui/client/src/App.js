import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css'
import logo from './logo.svg';
import Home from './pages/Home';

class App extends Component {

render() {

    return (
      <div className="App">
        <Router>
        <header className="App-header">
          <Link to="/" style={{textDecoration: 'none', color: 'white', display: 'flex'}}>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Job Finder 2000
            </p>
          </Link>
        </header>
        <div className="App-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={NoMatch} />
          </Switch>
        </div>
        </Router>
      </div>
    );
  }
}

function NoMatch({ location }) {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default App;