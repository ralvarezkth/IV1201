import RegisterView from '../view/registerView'
import React, { Component } from 'react';

class Register extends Component {
    state = {
        user: []
        }

    componentDidMount() {

    }
    async handleRegistrationSubmit(event) {
        //prevent the default - preventing the form from refreshing
        event.preventDefault();
        alert("!")

        try {
            fetch('/register')
                .then(res => res.json())
                //.then(user => this.setState({user: user }));//!!!

        } catch {
            //setError('Failed to create account')
        }
    }
    render() {
        return(
            React.createElement(RegisterView,{
                //!!!
                setUser: (u) => this.setState({user: u}),
                handleRegistrationSubmit: (e)=>this.handleRegistrationSubmit(e)
            })
        )
    }
}export default Register;
