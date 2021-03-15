import AdminView from "../view/adminView";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

/**
 * Component AdminVM handles the Admin page
 */
class AdminVM extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: null,
      msg: "",
      applicationId: null,
      statusId: null,
      applications: null,
      redirect: null,
      status: [
        { id: 1, name: "Unhandled" },
        { id: 2, name: "Accepted" },
        { id: 3, name: "Rejected" },
      ],
    };

    this.setApplication = this.setApplication.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.updateApplication = this.updateApplication.bind(this);
  }

  componentDidMount() {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqOp = { headers: { Authorization: `Bearer ${token}` } };

      fetch("/admin", reqOp).then(res => {
        let json = res.json();
        json
          .then(data => {
            if (res.status === 200) {
              this.setState({ applications: data });
            } else {
              this.setState({
                success: false,
                msg: "Access denied: " + data.error,
                redirect: "/login",
              });
            }
          })
          .catch(err => {
            this.setState({
              success: false,
              msg: "Unable to fetch applications, please try again later.",
            });
          });
      });
    } else {
      this.setState({
        success: false,
        msg:
          "Access denied: You need to be logged in as a recruiter to access this page.",
        redirect: "/login",
      });
    }
  }

  setApplication(ev) {
    this.setState({ applicationId: ev.target.value });
  }

  setStatus(ev) {
    this.setState({ statusId: ev.target.value });
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
      this.setState({
        success: true,
        msg:
          'Nothing to update, state already set to "' +
          this.state.status[statId - 1].name +
          '".',
      });
    } else {
      let updatedApplication = { ...this.state.applications[index] };
      updatedApplication.statusId = Number(statId);
      updatedApplication.status = this.state.status[statId - 1].name;
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqOp = {
          method: "PUT",
          body: JSON.stringify({ updatedApplication }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        fetch("/admin/" + appId, reqOp)
          .then(res => {
            if (res.status === 200) {
              res.json().then(data => {
                this.state.applications[index] = data;
                this.setState({
                  success: true,
                  msg:
                    "Application with id " +
                    data.id +
                    ' successfully set to "' +
                    data.status +
                    '".',
                });
              });
            } else {
              res.json().then(data => {
                this.setState({ success: false, msg: data.error });
              });
            }
          })
          .catch(err => {
            this.setState({
              success: false,
              msg: "Update of application failed. " + err.error,
            });
          });
      } else {
        this.setState({
          success: false,
          msg:
            "Access denied: You need to be logged in as a recruiter to access this page.",
          redirect: "/login",
        });
      }
    }
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={{ pathname: this.state.redirect, msg: this.state.msg }} />
      );
    }
    return (
      <AdminView
        setApplication={this.setApplication}
        setStatus={this.setStatus}
        updateApplication={this.updateApplication}
        state={this.state}
        content={this.props.content}
      />
    );
  }
}
export default AdminVM;
