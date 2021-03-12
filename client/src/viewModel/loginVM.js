import LoginView from '../view/loginView'
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class LoginVM extends Component{
    constructor(props) {
        super(props);

        this.state = {success: null, msg: "", redirect: null, user: null};

        this.handleLogin = this.handleLogin.bind(this);

        
    }

    componentDidMount() {
        if(this.props.location.msg) {
            this.setState({msg: this.props.location.msg});
        }
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
                console.log("@1");
                let json = res.json();

                json.then((data) => {
                    if(res.status === 200) {
                        console.log("@2");
                        console.log(JSON.stringify(data.user.role));
                        sessionStorage.setItem("token", data.token);
                        let redirect = data.user.role === "applicant" ? "/apply" : "/admin";
                        let msg = "Welcome back!";
                        if(data.user && data.user.firstName) {
                            msg = `Welcome back ${data.user.firstName}!`
                        }
                        this.setState({
                            success: true, 
                            msg,
                            redirect,
                            user: data.user
                        });
                    } else {
                        console.log("@3");
                        this.setState({
                            success: false,
                            msg: `Login failed. ${data.error}`
                        });
                    }
                }).catch(data => {
                    console.log("@4");
                    this.setState({
                            success: false,
                            msg: `Login failed. ${data.error}`
                        });
                });
            });

    }
    render(){
        if (this.state.redirect) {
            return <Redirect to={{pathname: this.state.redirect, state: this.state}}  />
        }
        return(
            React.createElement(LoginView, {
                handleLogin: this.handleLogin,
                state: this.state,
                props: this.props.content
            })
        )
    }
}
export default LoginVM;