import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
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
      <React.Fragment>
        {/* <NavBar /> */}
        {this.showNav()}
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default CosBuddy;
