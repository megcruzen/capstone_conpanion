import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
// import auth0Client from '../Auth';
import "./Conpanion.css";

class Conpanion extends Component {

  isAuthenticated = () => sessionStorage.getItem("User") !== null;

  showNav = () => {
    if (this.isAuthenticated()) {
        return <NavBar />
    }
  }

  render() {
    return (
      <div id="conpanion">
        {this.showNav()}
        <ApplicationViews />
      </div>
    );
  }
}

export default Conpanion;
