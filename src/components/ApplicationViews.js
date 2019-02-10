// import { Route, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import React, { Component } from "react";
import AppManager from "../modules/AppManager"
import "./CosBuddy.css";

import Login from './authentication/Login'
import Register from './authentication/Register'

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

  // Check if credentials are in local storage
  // isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  componentDidMount() {
    AppManager.getAllUsers()
    .then(allUsers => {
      this.setState({ users: allUsers });
    })

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

  addUser = (user) => AppManager.postUser(user)
  .then(response => response.json())
  .then(newUser => { this.setSessionAfterRegister(newUser) })

  setSessionAfterRegister = (newUser) => {
    sessionStorage.setItem(
        "credentials",
        JSON.stringify({
            name: newUser.username,
            email: newUser.email,
            id: newUser.id
        }))
    }

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

//   addCostumeItem = (item) => AppManager.postCostumeItem(item)
//   .then(() => AppManager.getCostumeItems())
//   .then(costumeItems => this.setState({
//     costumeItems: costumeItems
//   })
// )

  addCostumeItem = (item) => AppManager.postCostumeItem(item)
    // AppManager: POST
    // AppManager: .then(response => response.json())
    .then(response => this.copyNewCostumeItem(response))

    // .then(() => AppManager.getCostumeItems())
    // .then(costumeItems => this.setState({
    //   costumeItems: costumeItems
    // })
  // )

  copyNewCostumeItem = (response) => {
    console.log("item.costumeId", response.costumeId)
    const conCostumes = this.state.conCostumes;
    const filteredCostumes = conCostumes.filter( conCostume => conCostume.costumeId === response.costumeId)
    // console.log(conCostumes.map ( conCostume => conCostume.costumeId))
    console.log("filteredCostumes", filteredCostumes)
    filteredCostumes.map( conCostume => {
        const conCostumeItem = {
          conCostumeId: conCostume.id,
          costumeItemId: response.id,
          checked: false
        }
        console.log(conCostumeItem)
        AppManager.postConCostumeItem(conCostumeItem)
    })
  }

  addCostumeToCon = (costume) =>
    AppManager.postConCostume(costume)
    // AppManager: POST
    // AppManager: .then(response => response.json())
    .then(response => this.copyCostumeItems(response))

  copyCostumeItems = (response) => {
    console.log(response.id)
    const costumeItems = this.state.costumeItems;
    console.log(costumeItems)
    costumeItems.forEach( item => {
        console.log("itemId", item.costumeId, "costumeId", response.costumeId, "conCostumeId", response.id)
        if (item.costumeId === response.costumeId) {
            const conCostumeItem = {
                conCostumeId: response.id,
                costumeItemId: item.id,
                checked: false
            }
            // console.log(conCostumeItem)
            AppManager.postConCostumeItem(conCostumeItem)
            // .then(() => AppManager.getConCostumeItems())
        }
    })
    // .then(() => AppManager.getConCostumeItems())
    // .then(() => this.getConCostumeItems())
    // .then(conCostumeItems => this.setState({ conCostumeItems: conCostumeItems }))
  }

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

  deleteConCostumeItem = (id) => {
    AppManager.deleteConCostumeItem(id)
    .then(conCostumeItems =>
      this.setState({ conCostumeItems: conCostumeItems })
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

        <Route path="/login" render={(props) => {
            return <Login {...props}
                    users={this.state.users}
                    updateComponent={this.updateComponent} />
        }} />

        <Route path="/register" render={(props) => {
            return <Register {...props}
                  allUsers={this.state.allUsers}
                  addUser={this.addUser} />
        }} />

        <Route exact path="/" render={props => {
            return null
          }} />

        <Route exact path="/conventions" render={props => {
            return <ConventionList {...props}
                    myConventions={this.state.myConventions}
                    removeConvention={this.removeConvention} />
          }} />

        <Route exact path="/conventions/search" render={props => {
            return <ConventionSearch {...props}
                    allConventions={this.state.allConventions}
                    addUserConvention={this.addUserConvention} />
          }} />

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
                    getConCostumes={this.getConCostumes}
                    addConventionItem={this.addConventionItem}
                    conventionItems={this.state.conventionItems}
                    deleteConItem={this.deleteConItem}
                    updateItem={this.updateItem}
                    conCostumeItems={this.state.conCostumeItems}
                    costumeItems={this.state.costumeItems}
                    copyCostumeItems={this.copyCostumeItems}
                    updateConCostumeItem={this.updateConCostumeItem} />
        }} />

        <Route exact path="/costumes" render={props => {
            return <CostumeList {...props}
                    costumes={this.state.costumes} />
          }} />

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
                    editCostume={this.editCostume}
                    conCostumeItems={this.state.conCostumeItems}
                    deleteConCostumeItem={this.deleteConCostumeItem} />
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
