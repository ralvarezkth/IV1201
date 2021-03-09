import ApplyView from '../view/applyView'
import React, { Component } from 'react';

/**
 * Component ApplyVM handles the Apply page
 */
class ApplyVM extends Component {
    constructor(props) {
        super(props);

        this.setState({success: null, msg: ""});

        this.handleAccess = this.handleAccess.bind(this);
    }

    handleAccess(event){
        event.preventDefault();

        const token = sessionStorage.getItem("token");
        const reqOp = {headers: {'Authorization': `Bearer ${token}`}}

        fetch('/apply')
            .then(res => {
                
                let json = res.json();

                json.then(data => {
                    if (res.status === 200) {
                        this.setState({success: true, msg: data.securedData});
                    } else {
                        this.setState({success: false, msg: "Access denied: " + data.error});
                    }
                }).catch(err => {
                    this.setState({success: false, msg: "Access denied: " + res.statusText});
                });
            });


    }
        
    render() {
        return(
            React.createElement(ApplyView, {
                handleAccess: this.handleAccess,
                state: this.state
            })
        );
    }


}export default ApplyVM;
