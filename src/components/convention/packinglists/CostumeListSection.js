import React, { Component } from 'react';
import "../../CosBuddy.css";
import CostumePackingList from './CostumePackingList'

export default class CostumeListSection extends Component {

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

    render() {

        // console.log("props", this.props)
        // console.log("global packing list conCostume", this.props.conCostumes.map(conCostume => conCostume.userConventionId))
        // this.getCostumesForCon(this.props.myConventionId);

        return (
                <section className="costume_packing_lists mr-2 mb-3">

                    {/* {this.props.conCostumes.filter(conCostume =>
                            conCostume.userConventionId === this.props.convention.userConventionId) */}

                        {this.props.currentCostumes.map(conCostume =>
                        <CostumePackingList key={conCostume.id} conCostume={conCostume} {...this.props} />
                        // userConventionId={this.props.convention.userConventionId}
                    )}

                </section>
        )
    }
}