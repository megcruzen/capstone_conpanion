import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import "../CosBuddy.css";
import AppManager from '../../modules/AppManager';

export default class CosPackingListCard extends Component {

    // Set initial state
    state = {
        conCostumeId: "",
        costumeItemId: "",
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
            conCostumeId: this.props.myConventionId,
            costumeItemId: "",
            checked: false
        }

        // Create the item
        this.props.addCostumeItemToCon(newItem);
    }

    // getCostumesForCon = (userConId) => {
    //     AppManager.getCostumesForCon(userConId)
    //     .then(allConnections => allConnections.map(connection =>
    //         console.log("connection:", connection.userConventionId)))
    // }

    render() {

        console.log("convention Id", this.props.myConventionId)
        // this.getCostumesForCon(this.props.myConventionId);

        // console.log("conCostumes:", this.props.conCostumes)
        // console.log("userConventionId:", this.props.conCostumes.map(conCostume => conCostume.userConventionId))

        return (
                <section className="convention_packing_list mr-2 mb-3">
                    <h4>CostumeName</h4>
                    <Form onSubmit={this.addItem} className="d-flex">
                        <FormGroup className="w-100 mr-2">
                            <Label for="itemName" hidden>Item Name</Label>
                            <Input type="text" required name="itemName" id="itemName"
                            onChange={this.handleFieldChange} placeholder="Enter an item name" />
                        </FormGroup>
                        <div><Button color="primary">Add</Button></div>
                    </Form>
                    <div className="items_box">
                        <Table borderless striped>
                            <tbody>
                                {/* {
                                this.props.conventionItems
                                .filter(item => item.userConventionId === this.props.myConventionId)
                                .map(item => <ConItemCard key={item.id} item={item} {...this.props} />)
                                } */}
                                {/* {
                                this.props.conCostumeItems
                                .filter(item => item.conCostumeId === this.props.myConventionId)
                                .map(item => <ConItemCard key={item.id} item={item} {...this.props} />)
                                } */}
                            </tbody>
                        </Table>
                    </div>
                </section>
        )
    }
}