import LoginView from '../view/loginView'
import React, { Component } from 'react';

class Login extends Component{
    constructor(props) {
        super(props);

        this.setState({success: null, msg: ""});

        this.handleLogin = this.handleLogin.bind(this);
    }

    /**
     * Code to handle a login request and sends
     * it through post request to server
     * @param event is the submit (click) event that triggers
     * handleLogin to be called
     * @param loginRequest is an object carrying the information
     * about the login request
     */
    handleLogin(event, loginRequest){
        //prevent the default - preventing the page from refreshing
        event.preventDefault();

       const username= loginRequest.username;
       const password = loginRequest.password;
    

       fetch(`/login?username=${username}&password=${password}`)
            .then(res => {
                let json = res.json();
                
                json.then((data) => {
                    if(res.status === 200) {
                        this.setState({
                            success: true, 
                            msg: `Welcome back ${data.user.firstName}! Did you know that it's Fredrik's birthday today? Congratulations!!`
                        });
                        sessionStorage.setItem("token", data.token);
                    } else {
                        this.setState({
                            success: false,
                            msg: `Login failed. ${data.error}`
                        });
                    }
                }).catch(data => {
                    this.setState({
                            success: false,
                            msg: `Login failed. ${data.error}`
                        });
                });
            });
    }
    render(){
        return(
            React.createElement(LoginView, {
                handleLogin: this.handleLogin
            })
        )
    }
}
export default Login;