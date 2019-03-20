import React, { Component } from 'react';
import "../../Conpanion.css";
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
        event.preventDefault();
        event.target.reset();

        const newItem = {
            name: this.state.itemName,
            userConventionId: this.props.myConventionId,
            checked: false
        }

        // Create the item
        this.props.addConventionItem(newItem);
    }

    render() {

        return (
                <>
                    {this.props.currentCostumes.map(conCostume =>
                        <CostumePackingList key={conCostume.id} conCostume={conCostume} {...this.props} />
                    )}
                </>
        )
    }
}