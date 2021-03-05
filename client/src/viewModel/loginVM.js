import LoginView from '../view/loginView'
import React, { Component } from 'react';

class LoginVM extends Component{
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
                console.log("#1");
                let json = res.json();

                json.then((data) => {
                    console.log("#2");
                    if(res.status === 200) {
                        console.log("#3");
                        sessionStorage.setItem("token", data.token);
                        this.setState({
                            success: true, 
                            msg: `Welcome back ${data.firstName}!`
                        });
                    } else {
                        console.log("#4");
                        this.setState({
                            success: false,
                            msg: `Login failed. ${data.error}`
                        });
                    }
                }).catch(data => {
                    console.log("#5");
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
                handleLogin: this.handleLogin,
                state: this.state
            })
        )
    }
}
export default LoginVM; 