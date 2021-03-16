import AdminView from '../view/adminView'
import React, { Component } from 'react';

/**
 * Component AdminVM handles the Admin page
 */
class AdminVM extends Component {
    constructor(props) {
        super(props);

        this.state = {success: null, msg: "", applicationId: null, statusId: null, applications: null, appData: null, lang: this.props.lang,
                        status: [[{id: 1, name: "Unhandled"}, {id: 2, name: "Accepted"}, {id: 3, name: "Rejected"}],
                        [{id: 1, name: "Obehandlad"}, {id: 2, name: "Accepterad"}, {id: 3, name: "Avslagen"}],
                        [{id: 1, name: "Unbehandelt"}, {id: 2, name: "Akzeptiert "}, {id: 3, name: "Abgelehnt"}]]};

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
        let id = ev.target.value;
        let apps = this.state.applications;
        this.setState({applicationId: id});

        for (let i = 0; i < apps.length; i++) {
            if (apps[i].id == id) {
                let app = {};

                if (apps[i].competence) {
                    let comp = [];

                    apps[i].competence.forEach(com => {
                        comp.push({competence: com.competence, duration: com.duration});
                    });

                    app.competence = comp;
                }

                if (apps[i].availability) {
                    let avail = [];

                    apps[i].availability.forEach(av => {
                        avail.push({from: av.from, to: av.to});
                    });

                    app.availability = avail;
                }

                if (apps[i].status) {
                    let status = [];

                    apps[i].status.forEach(stat => {
                        status.push({langId: stat.lang_id, name: stat.name});
                    });

                    app.status = status;
                }

                this.setState({appData: app})
                break;
            }            
        }
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
            let msg = [{langId: 1, msg: "Nothing to update, state already set to \"" + this.state.status[0][statId - 1].name + "\"."}, {langId: 2, msg: "Inget att uppdatera, statusen redan satt till \"" + this.state.status[statId - 1].name + "\"."},
                {langId: 3, msg: "Nichts zu aktualisieren, Status bereits eingestellt \"" + this.state.status[statId - 1].name + "\"."}];
            this.setState({success: true, msg});
        } else {
            let updatedApplication = {...this.state.applications[index]};
            updatedApplication.statusId = Number(statId);
            updatedApplication.status = this.state.status[statId - 1].name;
            let opts = {method: 'PUT', body: JSON.stringify({updatedApplication}), headers: {'Content-Type': 'application/json'}};

            fetch("/admin/" + appId, opts).then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        let msg = [{langId: 1, msg: "Application with id " + data.id + " successfully set to \"" + data.status[0].name + "\"."}, {langId: 2, msg: "Ansökan med id " + data.id + " uppdaterad som \"" + data.status[1].name + "\"."},
                            {langId: 3, msg: "Anwendung mit id " + data.id + " erfolgreich auf gesetzt \"" + data.status[2].name + "\"."}];
                            let status = [];
                        this.state.applications[index] = data;
                        this.setState({success:true, msg});

                        data.status.forEach(stat => {
                            status.push({langId: stat.lang_id, name: stat.name});
                        });

                        let appData = {...this.state.appData};
                        appData.status = status;
                        this.setState({appData});
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
        
    render() {
        return(
            React.createElement(AdminView, {
                setApplication: this.setApplication,
                setStatus: this.setStatus,
                updateApplication: this.updateApplication,
                state: this.state,
                props: this.props.content,
                lang: this.props.lang
            })
        );
    }


} export default AdminVM;
