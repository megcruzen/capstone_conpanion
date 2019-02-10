import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import "../CosBuddy.css";
// import AppManager from '../../modules/AppManager';
import ConCosItemCard from "./ConCosItemCard"

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

    render() {

        // console.log("costume id", this.props.conCostume.costume.id)
        // console.log("concostume id", this.props.conCostume.id)

        const costumeId = this.props.conCostume.costume.id;

        return (

                <div className="con_costume_card">
                    <div className="d-flex justify-content-between align-items-center">
                        <div><h4>{this.props.conCostume.costume.name}</h4></div>
                        <div><i className="fas fa-edit mr-2 text-secondary" onClick={() => this.props.history.push(`/costumes/${costumeId}`)} style={{cursor:'pointer'}}></i></div>
                    </div>

                    {/* costumeId: {this.props.conCostume.costume.id}<br />
                    conCostumeId: {this.props.conCostume.id} */}
                    {/* <Form onSubmit={this.addItem} className="d-flex">
                        <FormGroup className="w-100 mr-2">
                            <Label for="itemName" hidden>Item Name</Label>
                            <Input type="text" required name="itemName" id="itemName"
                            onChange={this.handleFieldChange} placeholder="Enter an item name" />
                        </FormGroup>
                        <div><Button color="primary">Add</Button></div>
                    </Form> */}
                    <div className="items_box">
                        <Table borderless striped>
                            <tbody>

                                {
                                    this.props.conCostumeItems
                                    .filter(item => item.costumeItem.costumeId === this.props.conCostume.costume.id && item.conCostumeId === this.props.conCostume.id)
                                    .map(item => <ConCosItemCard key={item.id} item={item} conCostumeId={this.props.conCostume.id} {...this.props} />)
                                }

                            </tbody>
                        </Table>
                    </div>
                </div>
        )
    }
}