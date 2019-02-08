import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import "../CosBuddy.css";
import ConItemCard from "./ConItemCard"
import AppManager from '../../modules/AppManager';

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

    getCostumesForCon = (userConId) => {
        AppManager.getCostumesForCon(userConId)
        .then(allConnections => allConnections.map(connection =>
            console.log(connection)))
    }

    render() {

        // console.log("userConId:", this.props.myConventionId)
        // this.getCostumesForCon(this.props.myConventionId);

        return (
                <section className="convention_packing_list mr-2 mb-3">
                    <h4>Costume Packing List</h4>
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
                            </tbody>
                        </Table>
                    </div>
                </section>
        )
    }
}