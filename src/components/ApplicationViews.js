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
import CostumeDetails from './costume/CostumeDetails'

export default class ApplicationViews extends Component {

  state = {
    users: [],
    genres: [],
    allConventions: [],
    myConventions: [],
    costumes: [],
    costumeItems: []
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

    AppManager.getCostumeItems()
    .then(costumeItems => {
        this.setState({ costumeItems: costumeItems })
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

  addCostumeItem = (item) => AppManager.postCostumeItem(item)
    .then(() => AppManager.getCostumeItems())
    .then(costumeItems => this.setState({
      costumeItems: costumeItems
    })
  )

  /* DELETE */
  removeConvention = (id) => {
    return AppManager.deleteUserConvention(id)
    .then(myConventions =>
        this.setState({ myConventions: myConventions })
    )
  }

  deleteCostume= (id) => {
    return AppManager.deleteCostume(id)
    .then(costumes =>
        this.setState({ costumes: costumes })
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

        <Route path="/costumes/:costumeId(\d+)" render={(props) => {
            return <CostumeDetails {...props}
                    costumes={this.state.costumes}
                    costumeItems={this.state.costumeItems}
                    addCostumeItem={this.addCostumeItem}
                    deleteCostume={this.deleteCostume}
                    editCostume={this.editCostume} />
        }} />

      </div>
    );
  }
}
