import RegisterView from "../view/registerView";
import React, { Component } from "react";

/**
 * Component Register that takes care of the Registration site
 */
class RegisterVM extends Component {
  constructor(props) {
    super(props);

    this.state = { success: null, msg: "" };

    this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
  }

  /**
   * Code to handle a registation request and sends
   * it through post request to server
   * @param event is the submit (click) event that triggers
   * handleRegistrationSubmit to be called
   * @param newUser is an object carrying the information
   * about the user for the registation
   */
  handleRegistrationSubmit(event, newUser) {
    //prevent the default - preventing the form from refreshing
    event.preventDefault();

    const reqOp = {
      method: "POST",
      body: JSON.stringify({ newUser }),
      headers: { "Content-Type": "application/json" },
    };
    fetch("/register", reqOp).then(res => {
      let json = res.json();

      json
        .then(data => {
          if (res.status === 200) {
            this.setState({
              success: true,
              msg: "Hello " + data.firstName + "! Registration successful.",
            });
          } else {
            this.setState({
              success: false,
              msg: "Registration failed. " + data.error,
            });
          }
        })
        .catch(data => {
          this.setState({
            success: false,
            msg: "Registration failed. " + data.error,
          });
        });
    });
  }

  render() {
    return (
      <RegisterView
        handleRegistrationSubmit={this.handleRegistrationSubmit}
        state={this.state}
        content={this.props.content}
      />
    );
  }
}
export default RegisterVM;
