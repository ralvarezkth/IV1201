import HomeView from "../view/homeView";
import React, { Component } from "react";

/**
 * Component HomeVM handles the Home page
 */
class HomeVM extends Component {
  render() {
    return <HomeView />;
  }
}
export default HomeVM;

export function homeVM(props) {
  return <HomeView {...props} />;
}
