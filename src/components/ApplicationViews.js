import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import AppManager from "../modules/AppManager"
import "./Conpanion.css";

import Login from './authentication/Login'
// import Register from './authentication/Register'
import Welcome from './welcome/Welcome'

import ConventionList from './convention/ConventionList'
import ConventionSearch from './convention/search/SearchPage'
import ConventionForm from './convention/ConventionForm'
import ConventionDetails from './convention/ConventionDetails'

import CostumeList from './costume/CostumeList'
import CostumeForm from './costume/CostumeForm'
import CostumeEditForm from './costume/CostumeEditForm'
import CostumeDetails from './costume/CostumeDetails'

import GroupList from './group/GroupList'
import GroupForm from './group/GroupForm'
import GroupEditForm from './group/GroupEditForm'
import GroupDetails from './group/GroupDetails'

import Contact from './Contact'
import Callback from '../Callback'
// import auth0Client from '../Auth'

export default class ApplicationViews extends Component {

  state = {
    users: [],
    genres: [],
    allConventions: [],
    myConventions: [],
    userConventions: [],
    conventionItems: [],
    conCostumeItems: [],
    costumes: [],
    costumeItems: [],
    conCostumes: [],
    lineupDays: [],
    timeslots: [],
    allGroups: [],
    myGroups: [],
    // conGroups: [],
    groupMembers: [],
    messages: [],
    characters: []
  }

  // Check if credentials are in session storage
  isAuthenticated = () => sessionStorage.getItem("User") !== null

  componentDidMount() {
    this.getAllData();
  }

  getAllData = () => {
    AppManager.getAllUsers()
    .then(users => { this.setState({ users: users }) })

    AppManager.getAllConventions()
    .then(allConventions => { this.setState({ allConventions: allConventions }) })

    AppManager.getMyConventions()
    .then(myConventions => { this.setState({ myConventions: myConventions }) })

    AppManager.getUserConventions()
    .then(userConventions => { this.setState({ userConventions: userConventions }) })

    AppManager.getConventionItems()
    .then(conventionItems => { this.setState({ conventionItems: conventionItems }) })

    AppManager.getGenres()
    .then(genres => { this.setState({ genres: genres }) })

    AppManager.getCostumes()
    .then(costumes => { this.setState({ costumes: costumes }) })

    AppManager.getCostumeItems()
    .then(costumeItems => { this.setState({ costumeItems: costumeItems }) })

    AppManager.getConCostumes()
    .then(conCostumes => { this.setState({ conCostumes: conCostumes }) })

    AppManager.getConCostumeItems()
    .then(conCostumeItems => { this.setState({ conCostumeItems: conCostumeItems }) })

    AppManager.getDays()
    .then(lineupDays => { this.setState({ lineupDays: lineupDays }) })

    AppManager.getTimeslots()
    .then(timeslots => { this.setState({ timeslots: timeslots }) })

    AppManager.getAllGroups()
    .then(allGroups => { this.setState({ allGroups: allGroups }) })

    AppManager.getMyGroups()
    .then(myGroups => { this.setState({ myGroups: myGroups }) })

    // AppManager.getConGroups()
    // .then(conGroups => { this.setState({ conGroups: conGroups }) })

    AppManager.getGroupMembers()
    .then(groupMembers => { this.setState({ groupMembers: groupMembers }) })

    AppManager.getMessages()
    .then(messages => { this.setState({ messages: messages }) })

    AppManager.getCharacters()
    .then(characters => { this.setState({ characters: characters }) })
  }

  /* ADD NEW */

  addUser = (user) => AppManager.postUser(user)
  .then(response => response.json())
  .then(newUser => { this.setSessionAfterRegister(newUser) })
  .then(() => this.getAllData())

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
    // console.log("item.costumeId", response.costumeId)
    const conCostumes = this.state.conCostumes;
    const filteredCostumes = conCostumes.filter( conCostume => conCostume.costumeId === response.costumeId)
    // console.log(conCostumes.map ( conCostume => conCostume.costumeId))
    // console.log("filteredCostumes", filteredCostumes)
    filteredCostumes.map( conCostume => {
        const conCostumeItem = {
          conCostumeId: conCostume.id,
          costumeItemId: response.id,
          checked: false
        }
        // console.log(conCostumeItem)
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
    .then(() => AppManager.getCostumes())
    .then(response => newConCostumesAndItems.costumes = response)
    .then(() => { this.setState(newConCostumesAndItems) })
  }

  copyCostumeItems = (response) => {
    // console.log("response.id", response.id)
    const costumeItems = this.state.costumeItems;
    // console.log("costumeItems", costumeItems)

    return Promise.all(costumeItems.map( item => {
        // console.log("itemId", item.costumeId, "costumeId", response.costumeId, "conCostumeId", response.id)
        if (item.costumeId === response.costumeId) {
            const conCostumeItem = {
                conCostumeId: response.id,
                costumeItemId: item.id,
                checked: false
            }
            // console.log("conCostumeItem", conCostumeItem)
            return AppManager.postConCostumeItem(conCostumeItem)
        }
    })
    )
  }

  addNewDay = (newDay) =>
    AppManager.postNewDay(newDay)
    .then(() => AppManager.getDays())
    .then(lineupDays => this.setState({ lineupDays: lineupDays }))

  addTimeslot = (newTimeslot) =>
    AppManager.postTimeslot(newTimeslot)
    .then(() => AppManager.getTimeslots())
    .then(timeslots => this.setState({ timeslots: timeslots }))

  addMessage = (message) => AppManager.postMessage(message)
    .then(() => AppManager.getMessages())
    .then(messages => this.setState({ messages: messages }))

  createGroup = (group) => {
      let groups = {}
      return AppManager.postGroup(group)
      .then(newGroup => {
        const newUserGroup = {
            userId: newGroup.userId,
            groupId: newGroup.id
        }
        console.log(newUserGroup)
        return AppManager.createUserGroup(newUserGroup);
      })
      .then(() => AppManager.getMyGroups())
      .then(response => groups.myGroups = response)
      .then(() => AppManager.getAllGroups())
      .then(response => groups.allGroups = response)
      .then(() => { this.setState(groups) })
    }

    addMember = (member) => AppManager.postMember(member)
    .then(() => AppManager.getGroupMembers())
    .then(groupMembers => this.setState({ groupMembers: groupMembers }))

    addCharacter = (character) => AppManager.postCharacter(character)
    .then(() => AppManager.getCharacters())
    .then(characters => this.setState({ characters: characters }))


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
    let costumeItems = {}
    AppManager.deleteCostumeItem(id)
    .then(() => AppManager.getCostumeItems())
    .then(response => costumeItems.costumeItems = response)
    .then(() => AppManager.getConCostumeItems())
    .then(response => costumeItems.conCostumeItems = response)
    .then(() => { this.setState(costumeItems) })
  }

  // deleteCostumeItem = (id) => {
  //   return AppManager.deleteCostumeItem(id)
  //   .then(() => AppManager.getCostumeItems())
  //   .then(costumeItems => this.setState({ costumeItems: costumeItems }))
  //   .then(() => AppManager.getConCostumeItems())
  //   .then(conCostumeItems => this.setState({ conCostumeItems: conCostumeItems }))
  // }

  deleteConCostumeItem = (id) => {
    AppManager.deleteConCostumeItem(id)
    .then(() => AppManager.getConCostumeItems())
    .then(conCostumeItems => this.setState({ conCostumeItems: conCostumeItems }))
  }

  deleteDay = (id) => {
    return AppManager.deleteDay(id)
    .then(lineupDays => this.setState({ lineupDays: lineupDays }))
    .then(() => AppManager.getTimeslots(id))
    .then(timeslots => this.setState({ timeslots: timeslots }))
  }

  deleteTimeslot = (id) => {
    AppManager.deleteTimeslot(id)
    .then(timeslots => this.setState({ timeslots: timeslots }))
  }

  deleteGroup = (id) => {
    AppManager.deleteGroup(id)
    .then(myGroups => this.setState({ myGroups: myGroups }))
  }

  leaveGroup = (id) => {
    return AppManager.deleteUserGroup(id)
    .then(() => AppManager.getMyGroups())
    .then(myGroups => this.setState({ myGroups: myGroups }))
    .then(() => AppManager.getGroupMembers())
    .then(groupMembers => this.setState({ groupMembers: groupMembers }))
  }

  deleteCharacter = (id) => {
    AppManager.deleteCharacter(id)
    .then(characters => this.setState({ characters: characters }))
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

  updateCharacter = (characterId, editedCharacter) =>
    AppManager.editCharacter(characterId, editedCharacter)
    .then(() => AppManager.getCharacters())
    .then(characters => this.setState({ characters: characters })
  )

  editGroup = (groupId, editedGroup) =>
  AppManager.editGroup(groupId, editedGroup)
  .then(() => AppManager.getAllGroups())
  .then(allGroups => this.setState({ allGroups: allGroups }))
  .then(() => AppManager.getMyGroups())
  .then(myGroups => this.setState({ myGroups: myGroups }))


  /********/

  render() {
    return (
        <>

        <Route exact path='/callback' component={Callback}/>

        {/* <Route path="/login" render={(props) => {
            return <Login {...props}
                    users={this.state.users}
                    getAllData={this.getAllData} />
        }} />

        <Route path="/register" render={(props) => {
            return <Register {...props}
                  allUsers={this.state.allUsers}
                  addUser={this.addUser} />
        }} /> */}

        <Route exact path="/" render={props => {
            if (this.isAuthenticated()) {
              return <Welcome {...props}
                      users={this.state.users}
                      getAllData={this.getAllData}
                      myConventions={this.state.myConventions} />
            } else {
                  return <Login {...props} />
            }
          }} />

        <div id="appviews">

        {/* if (!auth0Client.isAuthenticated()) {
          auth0Client.signIn();
          return <div></div>;
        } */}

        <Route exact path="/conventions" render={props => {
            if (this.isAuthenticated()) {
              return <ConventionList {...props}
                    myConventions={this.state.myConventions}
                    removeConvention={this.removeConvention} />
            } else {
                  return <Redirect to="/" />
            }
          }} />


        <Route exact path="/conventions/search" render={props => {
            if (this.isAuthenticated()) {
              return <ConventionSearch {...props}
                    allConventions={this.state.allConventions}
                    addUserConvention={this.addUserConvention}
                    myConventions={this.state.myConventions} />
            } else {
              return <Redirect to="/" />
            }
          }} />

        <Route exact path="/conventions/new" render={(props) => {
          if (this.isAuthenticated()) {
            return <ConventionForm {...props}
                    addConvention={this.addConvention}
                    genres={this.state.genres} />
            } else {
              return <Redirect to="/" />
            }
        }} />

        <Route path="/conventions/:conventionId(\d+)" render={(props) => {
          if (this.isAuthenticated()) {
            return <ConventionDetails {...props}
                    allConventions={this.state.allConventions}
                    myConventions={this.state.myConventions}
                    userConventions={this.state.userConventions}
                    costumes={this.state.costumes}
                    addCostume={this.addCostume}
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
            return <Redirect to="/" />
          }
        }} />

        <Route exact path="/costumes" render={props => {
          if (this.isAuthenticated()) {
            return <CostumeList {...props}
                    costumes={this.state.costumes} />
          } else {
            return <Redirect to="/" />
          }
        }} />

        <Route exact path="/costumes/new" render={(props) => {
          if (this.isAuthenticated()) {
            return <CostumeForm {...props}
                    addCostume={this.addCostume} />
          } else {
            return <Redirect to="/" />
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
            return <Redirect to="/" />
          }
        }} />

        <Route path="/costumes/edit" render={(props) => {
          if (this.isAuthenticated()) {
            return <CostumeEditForm {...props}
                    costumes={this.state.costumes}
                    editCostume={this.editCostume} />
          } else {
            return <Redirect to="/" />
          }
        }} />

        <Route exact path="/groups" render={(props) => {
          if (this.isAuthenticated()) {
            return <GroupList {...props}
                    myGroups={this.state.myGroups}
                    allConventions={this.state.allConventions}
                    groupMembers={this.state.groupMembers}
                    conGroups={this.state.conGroups} />
            } else {
              return <Redirect to="/login" />
            }
        }} />

        <Route exact path="/groups/new" render={(props) => {
          if (this.isAuthenticated()) {
            return <GroupForm {...props}
                    createGroup={this.createGroup}
                    allConventions={this.state.allConventions} />
            } else {
              return <Redirect to="/" />
            }
        }} />

        <Route path="/groups/:groupId(\d+)" render={(props) => {
          if (this.isAuthenticated()) {
            return <GroupDetails {...props}
                    myGroups={this.state.myGroups}
                    allGroups={this.state.allGroups}
                    conGroups={this.state.conGroups}
                    allConventions={this.state.allConventions}
                    leaveGroup={this.leaveGroup}
                    deleteGroup={this.deleteGroup}
                    messages={this.state.messages}
                    groupMembers={this.state.groupMembers}
                    addMember={this.addMember}
                    users={this.state.users}
                    addMessage={this.addMessage}
                    characters={this.state.characters}
                    addCharacter={this.addCharacter}
                    deleteCharacter={this.deleteCharacter}
                    updateCharacter={this.updateCharacter} />
          } else {
            return <Redirect to="/" />
          }
        }} />

        <Route path="/groups/edit" render={(props) => {
          if (this.isAuthenticated()) {
            return <GroupEditForm {...props}
                    myGroups={this.state.myGroups}
                    allGroups={this.state.allGroups}
                    editGroup={this.editGroup}
                    allConventions={this.state.allConventions} />
          } else {
            return <Redirect to="/" />
          }
        }} />

        <Route exact path="/contact/" render={(props) => {
          if (this.isAuthenticated()) {
            return <Contact />
          } else {
            return <Redirect to="/" />
          }
        }} />

      </div>
      </>
    );
  }
}
