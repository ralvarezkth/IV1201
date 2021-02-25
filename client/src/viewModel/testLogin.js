import LoginView from '../view/loginView'
import React, { Component } from 'react';

class TestLogin extends Component{
    constructor(props) {
        super(props);
    }
    handleLogin(event, loginRequest){
        //prevent the default - preventing the page from refreshing
        event.preventDefault();

       const username= loginRequest.username;
       const password = loginRequest.password;
    

       fetch(`/login?username=${username}&password=${password}`)
            .then(res => res.json())
            .then((data) => {
               console.log(data); // do something with the user (data)

            })

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