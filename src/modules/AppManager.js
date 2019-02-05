const remoteURL = "http://localhost:5002"

export default {

    get(id) {
        return fetch(`${remoteURL}/students/${id}`)
        .then(data => data.json())
    },

    getMyConventions() {
        return fetch(`${remoteURL}/userConventions?userId=1&_expand=convention`)
        .then(data => data.json())
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

    createUserConvention(newCon) {
        console.log(newCon)
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

    getGenres() {
        return fetch(`${remoteURL}/genres`)
        .then(data => data.json())
    },

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
    }
}