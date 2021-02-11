import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Register from './viewModel/register'

function App() {
  return (
    <Router className="App">
      <Switch>
          <Route path="/register" exact component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
