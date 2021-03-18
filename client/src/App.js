import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import HeaderView from "./view/headerView";
import FooterView from "./view/footerView";
import { homeVM } from "./viewModel/homeVM";
import RegisterVM from "./viewModel/registerVM";
import LoginVM from "./viewModel/loginVM";
import ApplyVM from "./viewModel/applyVM";
import AdminVM from "./viewModel/adminVM";
import { effect, contents } from "./viewModel/appVM";

function App() {
  const [langId, setLangId] = useState(1);
  const [content, setContent] = useState(contents);
  const bound = effect.bind(null, langId, setContent);

  useEffect(bound, [langId]);

  return (
    <Router className="App">
      <HeaderView setLang={setLangId} content={content} />
      <Switch>
        <Route path="/" exact render={props => homeVM(content)} />
        <Route
          path="/register"
          exact
          render={props => <RegisterVM {...props} content={content} lang={langId} />}
        />
        <Route
          path="/login"
          render={props => <LoginVM {...props} content={content} lang={langId} />}
        />
        <Route
          path="/apply"
          render={props => <ApplyVM {...props} content={content} lang={langId} />}
        />
        <Route
          path="/admin"
          render={props => <AdminVM {...props} content={content} lang={langId} />}
        />
      </Switch>
      <FooterView content={content} />
    </Router>
  );
}

export default App;
