const remoteURL = "http://localhost:5002"

export default {

    // ETC

    // checkForUser(username, password) {
    //     return fetch(`${remoteURL}/users?username=${username}&password=${password}`)
    //     .then(response => response.json())
    // },

    checkForUser(email) {
        return fetch(`${remoteURL}/users?email=${email}`)
        // .then(response => response.json())
    },

    searchConventions(query) {
        return fetch(`${remoteURL}/conventions/?q=${query}`)
        .then(response => response.json())
    },


    // GET

    getAllUsers() {
        return fetch(`${remoteURL}/users`)
        .then(response => response.json())
    },

    getAllConventions() {
        return fetch(`${remoteURL}/conventions?_sort=name`)
        .then(response => response.json())
    },

    getMyConventions() {
        let sessionUser = sessionStorage.getItem("User");
        return fetch(`${remoteURL}/userConventions?userId=${Number(sessionUser)}&_expand=convention`)
        .then(response => response.json())
        .then(connections => connections.map(
            connection => {
                connection.convention.userConventionId = connection.id;
                return connection.convention
            }
            )
        )
    },

    getUserConventions() {
        return fetch(`${remoteURL}/userConventions`)
        .then(response => response.json())
    },

    getConventionItems() {
        return fetch(`${remoteURL}/conventionItems/`)
        .then(response => response.json())
    },

    getCostumeItems() {
        return fetch(`${remoteURL}/costumeItems/?_expand=costume`)
        .then(response => response.json())
    },

    getCostumes() {
        let sessionUser = sessionStorage.getItem("User");
        return fetch(`${remoteURL}/costumes?userId=${Number(sessionUser)}&_sort=timestamp&_order=desc`)
        .then(response => response.json())
    },

    getSpecificCostume(costumeId) {
        return fetch(`${remoteURL}/costumes/${costumeId}`)
        .then(response => response.json())
    },

    getConCostumes() {
        return fetch(`${remoteURL}/conCostumes?_expand=costume&_sort=id&_order=desc`)
        .then(response => response.json())
    },

    getCostumesForCon(userConId) {
        return fetch(`${remoteURL}/conCostumes?userConventionId=${userConId}&_expand=costume`)
        .then(response => response.json())
    },

    getConCostumeItems() {
        return fetch(`${remoteURL}/conCostumeItems?_expand=costumeItem&_expand=conCostume`)
        .then(response => response.json())
    },

    getGenres() {
        return fetch(`${remoteURL}/genres`)
        .then(response => response.json())
    },

    getDays() {
        return fetch(`${remoteURL}/days?_embed=timeslots`)
        .then(response => response.json())
    },

    getDayById(id) {
        return fetch(`${remoteURL}/days/${id}`)
        .then(response => response.json())
    },

    getTimeslots() {
        return fetch(`${remoteURL}/timeslots`)
        .then(response => response.json())
    },

    getTimeslotById(id) {
        return fetch(`${remoteURL}/timeslots/${id}`)
        .then(response => response.json())
    },

    getAllGroups() {
        return fetch(`${remoteURL}/groups?_expand=convention`)
        .then(response => response.json())
    },

    getMyGroups() {
        let sessionUser = sessionStorage.getItem("User");
        return fetch(`${remoteURL}/userGroups?userId=${Number(sessionUser)}&_expand=group`)
        .then(response => response.json())
    },

    getConGroups() {
        return fetch(`${remoteURL}/conGroups?_expand=convention`)
        .then(response => response.json())
    },

    getGroupMembers() {
        return fetch(`${remoteURL}/userGroups?_expand=user`)
        .then(response => response.json())
    },

    getMessages() {
        return fetch(`${remoteURL}/messages?_expand=user`)
        .then(response => response.json())
    },

    getMessage(id) {
        return fetch(`${remoteURL}/messages/${id}`)
        .then(response => response.json())
    },

    getCharacters() {
        return fetch(`${remoteURL}/characters?_sort=name`)
        .then(response => response.json())
    },

    getCharacterById(id) {
        return fetch(`${remoteURL}/characters/${id}`)
        .then(response => response.json())
    },


    // POST

    postUser(newUser) {
        return fetch(`${remoteURL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newUser)
        })
        // .then(response => response.json())
    },

    postConvention(newCon) {
        return fetch(`${remoteURL}/conventions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newCon)
        })
        .then(response => response.json())
    },

    createUserConvention(newCon) {
        // console.log(newCon)
        return fetch(`${remoteURL}/userConventions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newCon)
        })
        .then(response => response.json())
    },

    postConventionItem(newItem) {
        return fetch(`${remoteURL}/conventionItems`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newItem)
        })
        .then(response => response.json())
    },

    postCostume(newCostume) {
        return fetch(`${remoteURL}/costumes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newCostume)
        })
        .then(response => response.json())
    },

    postCostumeItem(newItem) {
        return fetch(`${remoteURL}/costumeItems`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newItem)
        })
        .then(response => response.json())
    },

    postConCostume(newCostume) {
        return fetch(`${remoteURL}/conCostumes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newCostume)
        })
        .then(response => response.json())
    },

    postConCostumeItem(newItem) {
        return fetch(`${remoteURL}/conCostumeItems`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newItem)
        })
        .then(response => response.json())
    },

    postNewDay(newDay) {
        return fetch(`${remoteURL}/days`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newDay)
        })
        .then(response => response.json())
    },

    postTimeslot(newTimeslot) {
        return fetch(`${remoteURL}/timeslots`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newTimeslot)
        })
        .then(response => response.json())
    },

    postGroup(newGroup) {
        return fetch(`${remoteURL}/groups`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newGroup)
        })
        .then(response => response.json())
    },

    createUserGroup(newUserGroup) {
        return fetch(`${remoteURL}/userGroups`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newUserGroup)
        })
        .then(response => response.json())
    },

    postMember(newMember) {
        return fetch(`${remoteURL}/userGroups`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newMember)
        })
        .then(data => data.json())
      },

    postMessage(newMessage) {
        return fetch(`${remoteURL}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newMessage)
        })
        .then(data => data.json())
      },

      postCharacter(newCharacter) {
        return fetch(`${remoteURL}/characters`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newCharacter)
        })
        .then(data => data.json())
      },

      saveToDoList(todolist) {
        return fetch(`${remoteURL}/todolists`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(todolist)
        })
        .then(data => data.json())
      },


    // DELETE

    deleteUserConvention(id) {
        return fetch(`${remoteURL}/userConventions/${id}`, {
            method: "DELETE"
        })
        .then(() => this.getMyConventions())
    },

    deleteConventionItem(id) {
        return fetch(`${remoteURL}/conventionItems/${id}`, {
            method: "DELETE"
        })
        .then(() => this.getConventionItems())
    },

    deleteCostume(id) {
        return fetch(`${remoteURL}/costumes/${id}`, {
            method: "DELETE"
        })
        .then(() => this.getCostumes())
    },

    deleteConCostume(id) {
        return fetch(`${remoteURL}/conCostumes/${id}`, {
            method: "DELETE"
        })
    },

    deleteCostumeItem(id) {
        return fetch(`${remoteURL}/costumeItems/${id}`, {
            method: "DELETE"
        })
    },

    deleteConCostumeItem(id) {
        return fetch(`${remoteURL}/conCostumeItems/${id}`, {
            method: "DELETE"
        })
    },

    deleteDay(id) {
        return fetch(`${remoteURL}/days/${id}`, {
            method: "DELETE"
        })
        .then(() => this.getDays())
    },

    deleteTimeslot(id) {
        return fetch(`${remoteURL}/timeslots/${id}`, {
            method: "DELETE"
        })
        .then(() => this.getTimeslots())
    },

    deleteGroup(id) {
        return fetch(`${remoteURL}/groups/${id}`, {
            method: "DELETE"
        })
        .then(() => this.getMyGroups())
    },

    deleteUserGroup(id) {
        return fetch(`${remoteURL}/userGroups/${id}`, {
            method: "DELETE"
        })
    },

    deleteCharacter(id) {
        return fetch(`${remoteURL}/characters/${id}`, {
            method: "DELETE"
        })
        .then(() => this.getCharacters())
    },


    // PUT

    editCostume(costumeId, editedCostume) {
        return fetch(`${remoteURL}/costumes/${costumeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedCostume)
        })
    },

    editConventionItem(itemId, editedItem) {
        return fetch(`${remoteURL}/conventionItems/${itemId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedItem)
        })
    },

    editConCostumeItem(itemId, editedItem) {
        return fetch(`${remoteURL}/conCostumeItems/${itemId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedItem)
        })
    },

    editDay(dayId, editedDay) {
        return fetch(`${remoteURL}/days/${dayId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedDay)
        })
    },

    editTimeslot(timeslotId, editedTimeslot) {
        return fetch(`${remoteURL}/timeslots/${timeslotId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedTimeslot)
        })
    },

    editCharacter(characterId, editedCharacter) {
        return fetch(`${remoteURL}/characters/${characterId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedCharacter)
        })
    },

    editGroup(groupId, editedGroup) {
        return fetch(`${remoteURL}/groups/${groupId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedGroup)
        })
    }
}