import React, { Component } from 'react'
import { Media, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import "../../CosBuddy.css"
import AppManager from "../../../modules/AppManager"

export default class SearchResults extends Component {

    state = {
        searchQuery: "",
        conventions: [],
        modal: false
    }

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        console.log(evt.target.id, evt.target.value);
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleSearch = evt => {
        evt.preventDefault();
        this.searchConventions(this.state.searchQuery)
        .then(() => this.props.history.push("/conventions/search"));
    }

    searchConventions = (searchQuery) => {
        const newSearchResults = {}
        return AppManager.searchConventions(searchQuery)
        .then(response => newSearchResults.conventions = response)
        .then(() => this.setState(newSearchResults))
    }

    getImageUrl = (convention) => {
        if (this.props.result.thumbnail === "") {
            return "https://i.imgur.com/noKpjHE.jpg"
        }
        else {
            return this.props.result.thumbnail
        }
    }

    checkConnection = (result) => {
        console.log("myConventions", this.props.myConventions)
        console.log("filter", this.props.myConventions.filter(myConvention => myConvention))
        console.log("this.props.result.id", this.props.result.id)

        if (this.props.myConventions.find(myConvention =>
            myConvention.id === this.props.result.id)) {
            return <Button color="secondary" disabled>Already Added</Button>
        }
        else {
            return <Button color="primary" onClick={(() => this.addConToList(this.props.result))}>Add to My Conventions</Button>
        }
    }

    addConToList = (result) => {
        let sessionUser = sessionStorage.getItem("User");
        const newUserCon = {
            userId: Number(sessionUser),
            conventionId: result.id
        }
        this.props.addUserConvention(newUserCon)
        this.toggle();
    }

    render() {

        let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "12"]

        let start = new Date(this.props.result.startDate);
        let startMonth = start.getMonth();
        let startDate = start.getUTCDate();
        // let startYear = start.getFullYear();

        let end = new Date(this.props.result.endDate);
        let endMonth = end.getMonth();
        let endDate = end.getUTCDate();
        let endYear = end.getFullYear();

        let dateDisplay = months[startMonth] + " " + startDate + " - " + months[endMonth] + " " + endDate + ", " + endYear;

        return (
            <tr>
                <td>
                    <Media className="pt-2 px-2">
                        <Media left href="#" className="mr-3">
                            <Media object src={this.getImageUrl(this.props.result)} className="thumb" alt="" />
                        </Media>
                        <Media body className="d-flex flex-wrap justify-content-between align-items-center">
                            <div className="con_details">
                                <h4>{this.props.result.name}</h4>
                                {dateDisplay}
                                <br />
                                {this.props.result.city}, {this.props.result.state}
                            </div>
                            <div className="w-25 text-center">{this.checkConnection(this.props.result.id)}</div>
                        </Media>
                    </Media>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalBody>
                            <strong>{this.props.result.name}</strong> was added to your conventions!
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Add Another Convention</Button>
                            <Button color="primary" onClick={(() => this.props.history.push("/conventions/"))}>Return to My Conventions</Button>
                        </ModalFooter>
                    </Modal>
                </td>
            </tr>
        )
    }
}