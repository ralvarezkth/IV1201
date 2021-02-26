import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import HeaderView from './view/headerView';
import HomeVM from './viewModel/homeVM';
import RegisterVM from './viewModel/registerVM'
import LoginVM from './viewModel/loginVM'
import ApplyVM from './viewModel/applyVM'

function App() {
  return (
    <Router className="App">
      <HeaderView />
        <Switch>
          <Route path="/" exact component={HomeVM} />
          <Route path="/register" exact component={RegisterVM} />
          <Route path="/login" component={LoginVM} />
          <Route path="/apply" component={ApplyVM} />
        </Switch>
    </Router>
  );
}

export default App;
