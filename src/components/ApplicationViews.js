// import { Route, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import React, { Component } from "react";
import AppManager from "../modules/AppManager"
import "./CosBuddy.css";

import ConventionList from './convention/ConventionList'
import CostumeList from './costume/CostumeList'

export default class ApplicationViews extends Component {

  state = {
    users: [],
    conventions: [],
    myConventions: [],
    costumes: []
  }

  componentDidMount() {
    AppManager.getMyConventions()
    .then(myConventions => {
        this.setState({ myConventions: myConventions })
    })

    AppManager.getCostumes()
    .then(costumes => {
        this.setState({ costumes: costumes })
    })
  }

  render() {
    return (
      <div id="appviews">

        <Route
          exact path="/" render={props => {
            return null
          }}
        />

        <Route path="/conventions" render={props => {
            return <ConventionList {...props}
                    myConventions={this.state.myConventions} />
          }}
        />

        <Route path="/costumes" render={props => {
            return <CostumeList {...props}
                    costumes={this.state.costumes} />
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
          }}
        />

      </div>
    );
  }
}
