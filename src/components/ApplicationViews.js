// import { Route, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import React, { Component } from "react";

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return null
          }}
        />

        <Route
          path="/conventions" render={props => {
            return null
          }}
        />

        <Route
          path="/costumes" render={props => {
            return null
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
          }}
        />

      </React.Fragment>
    );
  }
}
