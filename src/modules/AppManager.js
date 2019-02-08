const remoteURL = "http://localhost:5002"

export default {

    // CONVENTIONS

    getAllConventions() {
        return fetch(`${remoteURL}/conventions`)
        .then(data => data.json())
    },

    getMyConventions() {
        return fetch(`${remoteURL}/userConventions?userId=1&_expand=convention`)
        .then(data => data.json())
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
        .then(data => data.json())
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
        .then(data => data.json())
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
        .then(data => data.json())
    },

    postConventionItem(newItem) {
        return fetch(`${remoteURL}/conventionItems`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newItem)
        })
        .then(data => data.json())
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
        .then(data => data.json())
    },

    // COSTUMES

    getCostumes() {
        return fetch(`${remoteURL}/costumes?userId=1`)
        .then(data => data.json())
    },

    postCostume(newCostume) {
        return fetch(`${remoteURL}/costumes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newCostume)
        })
        .then(data => data.json())
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
        .then(data => data.json())
    },

    postCostumeItem(newItem) {
        return fetch(`${remoteURL}/costumeItems`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newItem)
        })
        .then(data => data.json())
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
        .then(data => data.json())
    },

    getCostumesForCon(conCostumeId) {
        return fetch(`${remoteURL}/conCostumes?userConventionId=${conCostumeId}&_expand=costume`)
        .then(data => data.json())
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
        .then(data => data.json())
    },

    getConCostumeItems() {
        return fetch(`${remoteURL}/conCostumeItems`)
        .then(data => data.json())
    },
}