import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import auth0Client from '../Auth';
import "./CosBuddy.css";

class CosBuddy extends Component {

  isAuthenticated = () => sessionStorage.getItem("User") !== null;

  showNav = () => {
    if (this.isAuthenticated()) {
        return <NavBar />
    }
  }

  render() {
    return (
      <div id="conpanion">
        {/* <NavBar /> */}
        {this.showNav()}
        <ApplicationViews />
      </div>
    );
  }
}

export default CosBuddy;
