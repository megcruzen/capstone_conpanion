// import { Route, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import React, { Component } from "react";
import AppManager from "../modules/AppManager"
import "./CosBuddy.css";

import ConventionList from './convention/ConventionList'
import ConventionSearch from './convention/ConventionSearch'
import ConventionForm from './convention/ConventionForm'
import CostumeList from './costume/CostumeList'
import CostumeForm from './costume/CostumeForm'

export default class ApplicationViews extends Component {

  state = {
    users: [],
    genres: [],
    allConventions: [],
    myConventions: [],
    costumes: []
  }

  componentDidMount() {
    AppManager.getMyConventions()
    .then(myConventions => {
        this.setState({ myConventions: myConventions })
    })

    AppManager.getGenres()
    .then(genres => {
        this.setState({ genres: genres })
    })

    AppManager.getCostumes()
    .then(costumes => {
        this.setState({ costumes: costumes })
    })
  }

  /* ADD NEW */

  addConvention = (convention) => AppManager.postConvention(convention)
    .then(newCon => {
      const newUserCon = {
          userId: newCon.userId,
          conventionId: newCon.id
      }
      console.log(newUserCon)
      AppManager.createUserConvention(newUserCon);
    })
    .then(() => AppManager.getMyConventions())
    .then(myConventions => this.setState({
      myConventions: myConventions
    })
  )

  addCostume = (costume) => AppManager.postCostume(costume)
    .then(() => AppManager.getCostumes())
    .then(costumes => this.setState({
      costumes: costumes
    })
  )

  /* DELETE */
  removeConvention = (id) => {
    return AppManager.deleteUserConvention(id)
    .then(myConventions =>
        this.setState({ myConventions: myConventions })
    )
  }

  render() {
    return (
      <div id="appviews">

        <Route exact path="/" render={props => {
            return null
          }}
        />

        <Route exact path="/conventions" render={props => {
            return <ConventionList {...props}
                    myConventions={this.state.myConventions}
                    removeConvention={this.removeConvention} />
          }}
        />

        <Route exact path="/conventions/search" render={props => {
            return <ConventionSearch {...props}
                    myConventions={this.state.myConventions} />
          }}
        />

        <Route exact path="/conventions/new" render={(props) => {
                    return <ConventionForm {...props}
                            addConvention={this.addConvention}
                            genres={this.state.genres} />
        }} />

        <Route exact path="/costumes" render={props => {
            return <CostumeList {...props}
                    costumes={this.state.costumes} />
          }}
        />

        <Route exact path="/costumes/new" render={(props) => {
            return <CostumeForm {...props}
                    addCostume={this.addCostume} />
        }} />

      </div>
    );
  }
}
