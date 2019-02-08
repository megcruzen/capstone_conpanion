// import { Route, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import React, { Component } from "react";
import AppManager from "../modules/AppManager"
import "./CosBuddy.css";

import ConventionList from './convention/ConventionList'
import ConventionSearch from './convention/ConventionSearch'
import ConventionForm from './convention/ConventionForm'
import ConventionDetails from './convention/ConventionDetails'

import CostumeList from './costume/CostumeList'
import CostumeForm from './costume/CostumeForm'
import CostumeEditForm from './costume/CostumeEditForm'
import CostumeDetails from './costume/CostumeDetails'

import Contact from './Contact.js'

export default class ApplicationViews extends Component {

  state = {
    users: [],
    genres: [],
    allConventions: [],
    myConventions: [],
    conventionItems: [],
    conCostumeItems: [],
    costumes: [],
    costumeItems: [],
    conCostumes: [],
  }

  componentDidMount() {
    AppManager.getAllConventions()
    .then(allConventions => {
        this.setState({ allConventions: allConventions })
    })

    AppManager.getMyConventions()
    .then(myConventions => {
        this.setState({ myConventions: myConventions })
    })

    AppManager.getConventionItems()
    .then(conventionItems => {
        this.setState({ conventionItems: conventionItems })
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

    AppManager.getConCostumes()
    .then(conCostumes => {
        this.setState({ conCostumes: conCostumes })
    })

    AppManager.getConCostumeItems()
    .then(conCostumeItems => {
        this.setState({ conCostumeItems: conCostumeItems })
    })
  }

  /* ADD NEW */

  addConvention = (convention) =>
    AppManager.postConvention(convention)
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

  addUserConvention = (newUserCon) =>
    AppManager.createUserConvention(newUserCon)
    .then(() => AppManager.getMyConventions())
    .then(myConventions => this.setState({
      myConventions: myConventions
    })
  )

  addConventionItem = (item) => AppManager.postConventionItem(item)
    .then(() => AppManager.getConventionItems())
    .then(conventionItems => this.setState({
      conventionItems: conventionItems
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

  addCostumeToCon = (costume) => AppManager.postConCostume(costume)
    // .then(result => console.log(result.id))
    // .then(() => AppManager.copyCostumeItems())
    .then(() => AppManager.getConCostumes())
    .then(conCostumes => this.setState({
      conCostumes: conCostumes
    })
  )

  copyCostumeItems = (item) => AppManager.postConCostumeItem(item)
    .then(() => AppManager.getConCostumeItems())
    .then(conCostumeItems => this.setState({
      conCostumeItems: conCostumeItems
    })
  )

  /* DELETE */

  removeConvention = (id) => {
    return AppManager.deleteUserConvention(id)
    .then(myConventions =>
        this.setState({ myConventions: myConventions })
    )
  }

  deleteConItem = (id) => {
    return AppManager.deleteConventionItem(id)
    .then(conventionItems =>
        this.setState({ conventionItems: conventionItems })
    )
  }

  deleteCostume = (id) => {
    return AppManager.deleteCostume(id)
    .then(costumes =>
        this.setState({ costumes: costumes })
    )
  }

  deleteConCostume = (id) => {
    return AppManager.deleteConCostume(id)
    .then(conCostumes =>
        this.setState({ conCostumes: conCostumes })
    )
  }

  deleteCostumeItem = (id) => {
    return AppManager.deleteCostumeItem(id)
    .then(costumeItems =>
        this.setState({ costumeItems: costumeItems })
    )
  }

  /* EDIT */

  editCostume = (costumeId, editedCostume) =>
    AppManager.editCostume(costumeId, editedCostume)
    .then(() => AppManager.getCostumes())
    .then(costumes => this.setState({
        costumes: costumes
        })
  )

  updateItem = (itemId, editedItem) =>
    AppManager.editConventionItem(itemId, editedItem)
    .then(() => AppManager.getConventionItems())
    .then(conventionItems => this.setState({
      conventionItems: conventionItems
        })
  )

  updateConCostumeItem = (itemId, editedItem) =>
    AppManager.editConCostumeItem(itemId, editedItem)
    .then(() => AppManager.getConCostumeItems())
    .then(conCostumeItems => this.setState({
      conCostumeItems: conCostumeItems
        })
  )

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
                    allConventions={this.state.allConventions}
                    addUserConvention={this.addUserConvention} />
          }}
        />

        <Route exact path="/conventions/new" render={(props) => {
            return <ConventionForm {...props}
                    addConvention={this.addConvention}
                    genres={this.state.genres} />
        }} />

        <Route path="/conventions/:conventionId(\d+)" render={(props) => {
            return <ConventionDetails {...props}
                    allConventions={this.state.allConventions}
                    myConventions={this.state.myConventions}
                    costumes={this.state.costumes}
                    conCostumes={this.state.conCostumes}
                    deleteConCostume={this.deleteConCostume}
                    addCostumeToCon={this.addCostumeToCon}
                    addConventionItem={this.addConventionItem}
                    conventionItems={this.state.conventionItems}
                    deleteConItem={this.deleteConItem}
                    updateItem={this.updateItem}
                    conCostumeItems={this.state.conCostumeItems}
                    costumeItems={this.state.costumeItems}
                    copyCostumeItems={this.copyCostumeItems} />
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
                    deleteCostumeItem={this.deleteCostumeItem}
                    deleteCostume={this.deleteCostume}
                    editCostume={this.editCostume} />
        }} />

        <Route path="/costumes/edit" render={(props) => {
            return <CostumeEditForm {...props}
                    costumes={this.state.costumes}
                    editCostume={this.editCostume} />
        }} />

        <Route exact path="/contact/" render={(props) => {
            return <Contact />
        }} />

      </div>
    );
  }
}
