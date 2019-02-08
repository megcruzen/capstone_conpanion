import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import "../CosBuddy.css";
import AppManager from '../../modules/AppManager';
import CosPackingListCard from './CosPackingListCard'

export default class CostumePackingList extends Component {

    // Set initial state
    state = {
        userConventionId: "",
        name: "",
        checked: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        // console.log(evt.target.id, evt.target.value);
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Add new item to costume
    addItem = event => {
        event.preventDefault();     // Cancels the default action of the submit.
        event.target.reset();       // Resets values after submit.

        const newItem = {
            name: this.state.itemName,
            userConventionId: this.props.myConventionId,
            checked: false
        }

        // Create the item
        this.props.addConventionItem(newItem);
    }

    // getCostumesForCon = (userConId) => {
    //     AppManager.getCostumesForCon(userConId)
    //     .then(allConnections => allConnections.map(connection =>
    //         console.log(connection)))
    // }

    render() {

        // console.log("props", this.props)
        // console.log("global packing list conCostume", this.props.conCostumes.map(conCostume => conCostume.userConventionId))
        // this.getCostumesForCon(this.props.myConventionId);

        return (
                <section className="costume_packing_lists mr-2 mb-3">

                    {this.props.conCostumes.filter(conCostume =>
                            conCostume.userConventionId === this.props.convention.userConventionId)
                        .map(conCostume =>
                        <CosPackingListCard key={conCostume.id} conCostume={conCostume} userConventionId={this.props.convention.userConventionId} {...this.props} />
                    )}

                </section>
        )
    }
}