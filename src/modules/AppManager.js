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

    getCostumes() {
        return fetch(`${remoteURL}/costumes?userId=1`)
        .then(data => data.json())
    }
}