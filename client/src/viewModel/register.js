import RegisterView from '../view/registerView'
import React, { Component } from 'react';

/**
 * Component Register that takes care of the Registration site
 */
class Register extends Component {
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

        try {
            const reqOp ={
                method: 'POST',
                body: JSON.stringify({newUser}),
                headers: {'Content-Type': 'application/json'}
            }
            fetch('/register', reqOp )
                .then(response => response.json()
            );
        } catch (error) {
            alert("Something went wrong! Couldn't create a new user")
        }
    }

    render() {
        return(
            React.createElement(RegisterView,{
                handleRegistrationSubmit: this.handleRegistrationSubmit
            })
        )
    }
}export default Register;
