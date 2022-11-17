import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
          <div>
            <header className="jumbotron">
              <h3>
                <strong>{currentUser.username}</strong> Profile
              </h3>
            </header>

            {/* Username */}
            <p>
              <strong>Username:</strong>{" "}
              {currentUser.id}
            </p>

            {/* First & Last Name */}
            <p>
              <strong>Name:</strong>{" "}
              {currentUser.id}
            </p>

            {/* Email */}
            <p>
              <strong>Email:</strong>{" "}
              {currentUser.email}
            </p>

            {/* Dat of Birth */}
            <p>
              <strong>Date of Birth:</strong>{" "}
              {currentUser.email}
            </p>

            {/* Location */}
            <p>
              <strong>Name:</strong>{" "}
              {currentUser.id}
            </p>

            {/* To do: education, branch of service, employer, */}

          </div> : null}
      </div>
    );
  }
}