const remoteURL = "http://localhost:5002"

export default {

    // USERS, SIGNUP, LOGIN

    getAllUsers() {
        return fetch(`${remoteURL}/users`)
        .then(response => response.json())
    },

    checkForUser(username, password) {
        return fetch(`${remoteURL}/users?username=${username}&password=${password}`)
        .then(response => response.json())
    },

    postUser(newUser) {
        return fetch(`${remoteURL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newUser)
        }).then(response => response.json())
    },

    // CONVENTIONS

    getAllConventions() {
        return fetch(`${remoteURL}/conventions`)
        .then(response => response.json())
    },

    getMyConventions() {
        return fetch(`${remoteURL}/userConventions?userId=1&_expand=convention`)
        .then(response => response.json())
        .then(connections => connections.map(
            connection => {
                connection.convention.userConventionId = connection.id;
                return connection.convention
            }
            )
        )
    },

    searchConventions(query) {
        return fetch(`${remoteURL}/conventions/?q=${query}`)
        .then(response => response.json())
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
        // .then(newCon => {
        //     const newUserCon = {
        //         userId: newCon.userId,
        //         conventionId: newCon.id
        //     }
        //     console.log(newUserCon)
        //     this.createUserConvention(newUserCon);
        //     })
        // .then(() => this.getMyConventions())
    },

    // USER-CONVENTION CONNECTIONS

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

    deleteUserConvention(id) {
        return fetch(`${remoteURL}/userConventions/${id}`, {
            method: "DELETE"
        })
        .then(() => this.getMyConventions())
    },

    // CONVENTION ITEMS

    getConventionItems() {
        return fetch(`${remoteURL}/conventionItems/`)
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

    deleteConventionItem(id) {
        return fetch(`${remoteURL}/conventionItems/${id}`, {
            method: "DELETE"
        })
        .then(() => this.getConventionItems())
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

    getGenres() {
        return fetch(`${remoteURL}/genres`)
        .then(response => response.json())
    },

    // COSTUMES

    getCostumes() {
        return fetch(`${remoteURL}/costumes?userId=1`)
        .then(response => response.json())
    },

    getSpecificCostume(costumeId) {
        return fetch(`${remoteURL}/costumes/${costumeId}`)
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

    deleteCostume(id) {
        return fetch(`${remoteURL}/costumes/${id}`, {
            method: "DELETE"
        })
        .then(() => this.getCostumes())
    },

    editCostume(costumeId, editedCostume) {
        return fetch(`${remoteURL}/costumes/${costumeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedCostume)
        })
    },

    // COSTUME ITEMS

    getCostumeItems() {
        return fetch(`${remoteURL}/costumeItems/?_expand=costume`)
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

    deleteCostumeItem(id) {
        return fetch(`${remoteURL}/costumeItems/${id}`, {
            method: "DELETE"
        })
        .then(() => this.getCostumeItems())
    },

    // COSTUMES PER EACH USER-CONVENTION

    getConCostumes() {
        return fetch(`${remoteURL}/conCostumes?_expand=costume`)
        .then(response => response.json())
    },

    getCostumesForCon(userConId) {
        return fetch(`${remoteURL}/conCostumes?userConventionId=${userConId}&_expand=costume`)
        .then(response => response.json())
    },

    deleteConCostume(id) {
        return fetch(`${remoteURL}/conCostumes/${id}`, {
            method: "DELETE"
        })
        .then(() => this.getConCostumes())
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
        // .then(result => console.log(result.id))
    },

    getConCostumeItems() {
        return fetch(`${remoteURL}/conCostumeItems?_expand=costumeItem`)
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

    editConCostumeItem(itemId, editedItem) {
        return fetch(`${remoteURL}/conCostumeItems/${itemId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedItem)
        })
    },
}