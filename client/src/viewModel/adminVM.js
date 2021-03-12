import AdminView from '../view/adminView'
import React, { Component } from 'react';

/**
 * Component AdminVM handles the Admin page
 */
class AdminVM extends Component {
    constructor(props) {
        super(props);

        this.state = {success: null, msg: "", applicationId: null, statusId: null, applications: null, 
                        status: [{id: 1, name: "Unhandled"}, {id: 2, name: "Accepted"}, {id: 3, name: "Rejected"}]};

        this.getApplications = this.getApplications.bind(this);
        this.setApplication = this.setApplication.bind(this);
        this.setStatus = this.setStatus.bind(this);
        this.updateApplication = this.updateApplication.bind(this);
    }

    componentDidMount() {
        fetch("/admin").then(res => {
            res.json().then(data => {
                this.setState({applications: data});
            })
        }).catch(err => {
            this.setState({success: false, msg: "Unable to fetch applications, please try again later."});
        });
    }

    setApplication(ev) {
        this.setState({applicationId: ev.target.value});
    }

    setStatus(ev) {
        this.setState({statusId: ev.target.value});
    }

    updateApplication(event) {
        event.preventDefault();
        let appId = event.target.application.value;
        let statId = event.target.status.value;
        let index;

        for (let i = 0; i < this.state.applications.length; i++) {
            if (this.state.applications[i].id == appId) {
                index = i;
            }
        }

        if (this.state.applications[index].statusId == statId) {
            this.setState({success: true, msg: "Nothing to update, state already set to \"" + this.state.status[statId - 1].name + "\"."});
        } else {
            let updatedApplication = {...this.state.applications[index]};
            updatedApplication.statusId = Number(statId);
            updatedApplication.status = this.state.status[statId - 1].name;
            let opts = {method: 'PUT', body: JSON.stringify({updatedApplication}), headers: {'Content-Type': 'application/json'}};

            fetch("/admin/" + appId, opts).then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        this.state.applications[index] = data;
                        this.setState({success:true, msg: "Application with id " + data.id + " successfully set to \"" + data.status + "\"."});
                    });
                } else {
                    res.json().then(data => {
                        this.setState({success: false, msg: data.error});
                    });
                }
            }).catch(err => {
                this.setState({success: false, msg: "Update of application failed. " + err.error});
            });
        }
        
    }

    getApplications(event) {       
        const token = sessionStorage.getItem("token");
        const reqOp = {headers: {'Authorization': `Bearer ${token}`}}

        fetch('/apply', reqOp)
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
            React.createElement(AdminView, {
                setApplication: this.setApplication,
                setStatus: this.setStatus,
                updateApplication: this.updateApplication,
                state: this.state,
                props: this.props.content
            })
        );
    }


} export default AdminVM;
