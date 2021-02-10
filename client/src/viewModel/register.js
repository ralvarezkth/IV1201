import RegisterView from '../view/registerView'
import React, { Component } from 'react';

class Register extends Component {
    state = {
        user: {}
    }

    componentDidMount() {

    }
    handleRegistrationSubmit(event) {
        //prevent the default - preventing the form from refreshing
        event.preventDefault();
        console.log(this.state.user);

        try {
            fetch('/register')
                .then(res => res.json())
                //.then(data => );//!!!

        } catch {
            //setError('Failed to create account')
        }
    }
    render() {
        return(
            React.createElement(RegisterView,{
                setUser: this.setState.bind(this),
                handleRegistrationSubmit: this.handleRegistrationSubmit
            })
        )
    }
}export default Register;
