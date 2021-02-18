import LoginView from '../view/loginView'
import React, { Component } from 'react';

class TestLogin extends Component{
    constructor(props) {
        super(props);
    }
    handleLogin(event, loginRequest){
        event.preventDefault();
        console.log("username: " + loginRequest.username)
        console.log("password: " + loginRequest.password)
    }
    render(){
        return(
            React.createElement(LoginView, {
                handleLogin: this.handleLogin
            })
        )
    }
}
export default TestLogin;