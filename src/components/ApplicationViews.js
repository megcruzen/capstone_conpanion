import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import AppManager from "../modules/AppManager"
import "./CosBuddy.css";

import Login from './authentication/Login'
import Register from './authentication/Register'

import ConventionList from './convention/ConventionList'
import ConventionSearch from './convention/search/SearchPage'
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
    lineupDays: [],
    timeslots: []
  }

  // Check if credentials are in local storage
  isAuthenticated = () => sessionStorage.getItem("User") !== null

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

    AppManager.getDays()
    .then(lineupDays => {
        this.setState({ lineupDays: lineupDays })
    })

    AppManager.getTimeslots()
    .then(timeslots => {
        this.setState({ timeslots: timeslots })
    })
  }

  /* ADD NEW */

  addUser = (user) => AppManager.postUser(user)
  .then(response => response.json())
  .then(newUser => { this.setSessionAfterRegister(newUser) })

  setSessionAfterRegister = (newUser) => {
    sessionStorage.setItem("User", JSON.stringify(newUser.id))
    }

  addConvention = (convention) => {
    let conventions = {}
    return AppManager.postConvention(convention)
    .then(newCon => {
      const newUserCon = {
          userId: newCon.userId,
          conventionId: newCon.id
      }
      console.log(newUserCon)
      return AppManager.createUserConvention(newUserCon);
    })
    .then(() => AppManager.getMyConventions())
    .then(response => conventions.myConventions = response)
    .then(() => AppManager.getAllConventions())
    .then(response => conventions.allConventions = response)
    .then(() => { this.setState(conventions) })
  }

  addUserConvention = (newUserCon) =>
    AppManager.createUserConvention(newUserCon)
    .then(() => AppManager.getMyConventions())
    .then(myConventions => this.setState({ myConventions: myConventions })
  )

  addConventionItem = (item) => AppManager.postConventionItem(item)
    .then(() => AppManager.getConventionItems())
    .then(conventionItems => this.setState({ conventionItems: conventionItems })
  )

  addCostume = (costume) => AppManager.postCostume(costume)
    .then(() => AppManager.getCostumes())
    .then(costumes => this.setState({ costumes: costumes })
  )

  addCostumeItem = (item) => {
    let newItems = {}
    return AppManager.postCostumeItem(item)
    // AppManager: POST
    // AppManager: .then(response => response.json())
    .then(response => this.copyNewCostumeItem(response))
    .then(() => AppManager.getCostumeItems())
    .then(response => newItems.costumeItems = response)
    .then(() => AppManager.getConCostumeItems())
    .then(response => newItems.conCostumeItems = response)
    .then(() => { this.setState(newItems) })
  }

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

  addCostumeToCon = (costume) => {
    let newConCostumesAndItems = {}
    return AppManager.postConCostume(costume)
    // AppManager: POST
    // AppManager: .then(response => response.json())
    .then(response => this.copyCostumeItems(response))
    .then(() => AppManager.getConCostumeItems())
    .then(response => newConCostumesAndItems.conCostumeItems = response)
    .then(() => AppManager.getConCostumes())
    .then(response => newConCostumesAndItems.conCostumes = response)
    .then(() => { this.setState(newConCostumesAndItems) })
  }

  copyCostumeItems = (response) => {
    // console.log(response.id)
    const costumeItems = this.state.costumeItems;
    // console.log(costumeItems)

    return Promise.all(costumeItems.map( item => {
        // console.log("itemId", item.costumeId, "costumeId", response.costumeId, "conCostumeId", response.id)
        if (item.costumeId === response.costumeId) {
            const conCostumeItem = {
                conCostumeId: response.id,
                costumeItemId: item.id,
                checked: false
            }
            // console.log(conCostumeItem)
            return AppManager.postConCostumeItem(conCostumeItem)
        }
    })
    )
  }

  addNewDay = (newDay) =>
    AppManager.postNewDay(newDay)
    .then(() => AppManager.getDays())
    .then(lineupDays => this.setState({ lineupDays: lineupDays })
  )

  addTimeslot = (newTimeslot) =>
    AppManager.postTimeslot(newTimeslot)
    .then(() => AppManager.getTimeslots())
    .then(timeslots => this.setState({ timeslots: timeslots })
  )

  /* DELETE */

  removeConvention = (id) => {
    return AppManager.deleteUserConvention(id)
    .then(myConventions => this.setState({ myConventions: myConventions }))
  }

  deleteConItem = (id) => {
    return AppManager.deleteConventionItem(id)
    .then(conventionItems => this.setState({ conventionItems: conventionItems }))
  }

  deleteCostumeAndDependents = (id) => {
    this.deleteConCostumes(id);
    this.deleteCostume(id);
  }

  deleteCostume = (id) => {
    return AppManager.deleteCostume(id)
    .then(costumes => this.setState({ costumes: costumes }))
  }

  deleteConCostume = (id) => {
    let ConCostumesAndItems = {}
    return AppManager.deleteConCostume(id)
    .then(() => AppManager.getConCostumeItems())
    .then(response => ConCostumesAndItems.conCostumeItems = response)
    .then(() => AppManager.getConCostumes())
    .then(response => ConCostumesAndItems.conCostumes = response)
    .then(() => { this.setState(ConCostumesAndItems) })
  }

  deleteConCostumes = (costumeId) => {
    return this.state.conCostumes
              .filter(conCostume =>
                conCostume.costumeId === costumeId)
              .map(conCostume =>
                this.deleteConCostume(conCostume.id))
  }

  deleteCostumeItem = (id) => {
    return AppManager.deleteCostumeItem(id)
    .then(costumeItems => this.setState({ costumeItems: costumeItems }))
  }

  deleteConCostumeItem = (id) => {
    AppManager.deleteConCostumeItem(id)
    .then(conCostumeItems => this.setState({ conCostumeItems: conCostumeItems }))
  }

  deleteDay = (id) => {
    AppManager.deleteDay(id)
    .then(lineupDays => this.setState({ lineupDays: lineupDays }))
  }

  deleteTimeslot = (id) => {
    AppManager.deleteTimeslot(id)
    .then(timeslots => this.setState({ timeslots: timeslots }))
  }

  /* EDIT */

  editCostume = (costumeId, editedCostume) =>
    AppManager.editCostume(costumeId, editedCostume)
    .then(() => AppManager.getCostumes())
    .then(costumes => this.setState({ costumes: costumes })
  )

  updateItem = (itemId, editedItem) =>
    AppManager.editConventionItem(itemId, editedItem)
    .then(() => AppManager.getConventionItems())
    .then(conventionItems => this.setState({ conventionItems: conventionItems })
  )

  updateConCostumeItem = (itemId, editedItem) =>
    AppManager.editConCostumeItem(itemId, editedItem)
    .then(() => AppManager.getConCostumeItems())
    .then(conCostumeItems => this.setState({ conCostumeItems: conCostumeItems })
  )

  updateTimeslot = (timeslotId, editedTimeslot) =>
    AppManager.editTimeslot(timeslotId, editedTimeslot)
    .then(() => AppManager.getTimeslots())
    .then(timeslots => this.setState({ timeslots: timeslots })
  )

  updateDay = (dayId, editedDay) =>
    AppManager.editDay(dayId, editedDay)
    .then(() => AppManager.getDays())
    .then(lineupDays => this.setState({ lineupDays: lineupDays })
  )


  /********/

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

        <Route exact path="/conventions" render={props => {
            if (this.isAuthenticated()) {
              return <ConventionList {...props}
                    myConventions={this.state.myConventions}
                    removeConvention={this.removeConvention} />
            } else {
                  return <Redirect to="/login" />
            }
          }} />


        <Route exact path="/conventions/search" render={props => {
            if (this.isAuthenticated()) {
              return <ConventionSearch {...props}
                    allConventions={this.state.allConventions}
                    addUserConvention={this.addUserConvention} />
            } else {
              return <Redirect to="/login" />
            }
          }} />

        <Route exact path="/conventions/new" render={(props) => {
          if (this.isAuthenticated()) {
            return <ConventionForm {...props}
                    addConvention={this.addConvention}
                    genres={this.state.genres} />
            } else {
              return <Redirect to="/login" />
            }
        }} />

        <Route path="/conventions/:conventionId(\d+)" render={(props) => {
          if (this.isAuthenticated()) {
            return <ConventionDetails {...props}
                    allConventions={this.state.allConventions}
                    myConventions={this.state.myConventions}
                    costumes={this.state.costumes}
                    addConventionItem={this.addConventionItem}
                    conventionItems={this.state.conventionItems}
                    deleteConItem={this.deleteConItem}
                    updateItem={this.updateItem}
                    conCostumes={this.state.conCostumes}
                    getConCostumes={this.getConCostumes}
                    addCostumeToCon={this.addCostumeToCon}
                    deleteConCostume={this.deleteConCostume}
                    deleteConCostumeItem={this.deleteConCostumeItem}
                    conCostumeItems={this.state.conCostumeItems}
                    costumeItems={this.state.costumeItems}
                    copyCostumeItems={this.copyCostumeItems}
                    updateConCostumeItem={this.updateConCostumeItem}
                    addCostumeItem={this.addCostumeItem}
                    deleteCostumeItem={this.deleteCostumeItem}
                    lineupDays={this.state.lineupDays}
                    addNewDay={this.addNewDay}
                    updateDay={this.updateDay}
                    deleteDay={this.deleteDay}
                    timeslots={this.state.timeslots}
                    addTimeslot={this.addTimeslot}
                    updateTimeslot={this.updateTimeslot}
                    deleteTimeslot={this.deleteTimeslot} />
          } else {
            return <Redirect to="/login" />
          }
        }} />

        <Route exact path="/costumes" render={props => {
          if (this.isAuthenticated()) {
            return <CostumeList {...props}
                    costumes={this.state.costumes} />
          } else {
            return <Redirect to="/login" />
          }
        }} />

        <Route exact path="/costumes/new" render={(props) => {
          if (this.isAuthenticated()) {
            return <CostumeForm {...props}
                    addCostume={this.addCostume} />
          } else {
            return <Redirect to="/login" />
          }
        }} />

        <Route path="/costumes/:costumeId(\d+)" render={(props) => {
          if (this.isAuthenticated()) {
            return <CostumeDetails {...props}
                    costumes={this.state.costumes}
                    costumeItems={this.state.costumeItems}
                    conCostumes={this.state.conCostumes}
                    addCostumeItem={this.addCostumeItem}
                    deleteCostumeItem={this.deleteCostumeItem}
                    deleteCostume={this.deleteCostume}
                    editCostume={this.editCostume}
                    deleteConCostume={this.deleteConCostume}
                    conCostumeItems={this.state.conCostumeItems}
                    deleteConCostumeItem={this.deleteConCostumeItem}
                    deleteCostumeAndDependents={this.deleteCostumeAndDependents} />
          } else {
            return <Redirect to="/login" />
          }
        }} />

        <Route path="/costumes/edit" render={(props) => {
          if (this.isAuthenticated()) {
            return <CostumeEditForm {...props}
                    costumes={this.state.costumes}
                    editCostume={this.editCostume} />
          } else {
            return <Redirect to="/login" />
          }
        }} />

        <Route exact path="/contact/" render={(props) => {
          if (this.isAuthenticated()) {
            return <Contact />
          } else {
            return <Redirect to="/login" />
          }
        }} />

      </div>
    );
  }
}
