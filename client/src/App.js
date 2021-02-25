import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Register from './viewModel/register'
import TestLogin from './viewModel/testLogin'
import TestView from './TestView'

function App() {
  return (
    <Router className="App">
        <Switch>
          <Route path="/register" exact component={Register} />
          <Route path="/login" component={TestLogin} />
          <Route path="/users" component={TestView}/>
        </Switch>
    </Router>
  );
}

export default App;
