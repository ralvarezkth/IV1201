import ApplyView from "../view/applyView";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

/**
 * Component ApplyVM handles the Apply page
 */
class ApplyVM extends Component {
  constructor(props) {
    super(props);

    this.state = { success: null, msg: "", redirect: null };

    this.handleApplicationSubmit = this.handleApplicationSubmit.bind(this);
  }

  componentDidMount() {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqOp = { headers: { Authorization: `Bearer ${token}` } };

      fetch("/apply", reqOp).then(res => {
        let json = res.json();
        json
          .then(data => {
            if (res.status === 200) {
              this.setState({ success: true });
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
              msg: "Access denied: " + res.statusText,
            });
          });
      });
    } else {
      this.setState({
        success: false,
        msg:
          "Access denied: You need to be logged in as an applicant to access this page.",
        redirect: "/login",
      });
    }
  }

  handleApplicationSubmit(event, newApplication) {
    event.preventDefault();
    const token = sessionStorage.getItem("token");
    const reqOp = {
      method: "POST",
      body: JSON.stringify({ newApplication }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    fetch("/apply", reqOp).then(res => {
      let json = res.json();

      json
        .then(data => {
          if (res.status === 200) {
            this.setState({
              success: true,
              msg: "Your application has been received",
            });
          } else {
            this.setState({
              success: false,
              msg: "Your application was not registered: " + data.error,
            });
          }
        })
        .catch(data => {
          this.setState({
            success: false,
            msg: "Your application was not registered: " + data.error,
          });
        });
    });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={{ pathname: this.state.redirect, msg: this.state.msg }} />
      );
    }
    return (
      <ApplyView
        onApplicationSubmit={this.handleApplicationSubmit}
        state={this.state}
        content={this.props.content}
      />
    );
  }
}
export default ApplyVM;
