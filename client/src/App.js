import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import RegisterView from './viewModel/register'
import LoginView from './viewModel/login'
import ApplyView from './view/applyView'

function App() {
  return (
    <Router className="App">
        <Switch>
          <Route path="/register" exact component={RegisterView} />
          <Route path="/login" component={LoginView} />
          <Route path="/apply" component={ApplyView}/>
        </Switch>
    </Router>
  );
}

export default App;
