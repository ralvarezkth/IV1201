import RegisterView from '../view/registerView'
import React, { Component } from 'react';

/**
 * Component Register that takes care of the Registration site
 */
class Register extends Component {

    constructor(props) {
        super(props);

        this.setState({success: null, msg: ""});

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

        try {
            const reqOp ={
                method: 'POST',
                body: JSON.stringify({newUser}),
                headers: {'Content-Type': 'application/json'}
            }
            fetch('/register', reqOp )
                .then(response => {
                    let json = response.json();

                    json.then(data => {
                        if (response.status === 200) {
                            this.setState({success: true, msg: "Hello " + data.firstName + "! Registration successful. Would you care for some pancakes? Richard's treat."});
                        } else {
                            this.setState({success: false, msg: "Registration failed. " + data.error});
                        }  
                    }).catch(data => {
                        this.setState({success: false, msg: "Registration failed. + data.error"});
                    });
                });
        } catch (error) {
            alert("Something went wrong! Couldn't create a new user")
            this.setState({success: false, msg: "Registration failed. Please try again."});
        }
    }

    render() {
        return(
            React.createElement(RegisterView,{
                handleRegistrationSubmit: this.handleRegistrationSubmit,
                state: this.state
            })
        )
    }
}export default Register;
