import ApplyView from '../view/applyView'
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

/**
 * Component ApplyVM handles the Apply page
 */
class ApplyVM extends Component {
    constructor(props) {
        super(props);

        this.state = {success: null, msg: "", redirect: null, user: null};

        this.handleApplicationSubmit = this.handleApplicationSubmit.bind(this);

    }

    componentDidMount() {
        const token = sessionStorage.getItem("token");
        let reqOp;
        if(token) {
            reqOp = {headers: {'Authorization': `Bearer ${token}`}}
        }

        fetch("/apply", reqOp)
            .then(res => {
                let json = res.json();
                json.then(data => {
                    if (res.status === 200) {
                        this.setState({success: true, user: this.props.location.user});
                    } else {
                        this.setState({success: false, msg: "Access denied: " + data.error, redirect: "/login"});
                    }
                }).catch(err => {
                    this.setState({success: false, msg: "Access denied: " + res.statusText});
                });
            })
    }

    handleApplicationSubmit(event, newApplication) {
        event.preventDefault();
        const token = sessionStorage.getItem("token");
        const reqOp = {
                method: 'POST',
                body: JSON.stringify({newApplication}),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        fetch("/apply", reqOp)
            .then(res => {
                let json = res.json();

                json.then(data => {
                    if (res.status === 200) {
                        this.setState({success: true, msg: "Your application has been received"});
                    } else {
                        this.setState({success: false, msg: "Your application was not registered: " + data.error});
                    }  
                }).catch(data => {
                    this.setState({success: false, msg: "Your application was not registered: " + data.error});
                });
            });
    }
        
    render() {
        if (this.state.redirect) {
            return <Redirect to={{pathname: this.state.redirect, msg: this.state.msg}}  />
        }
        return(
            React.createElement(ApplyView, {
                handleApplicationSubmit: this.handleApplicationSubmit,
                state: this.state,
                props: this.props.content,  
            })
        );
    }

}export default ApplyVM;
