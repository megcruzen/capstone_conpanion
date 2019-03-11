import React, { Component } from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import "../../Conpanion.css";
import ConCostumeItem from "./CostumeItem"
import CostumeItemCard from "../../costume/CostumeItemCard"

export default class CostumePackingList extends Component {

    // Set initial state
    state = {
        conCostumeId: "",
        costumeItemId: "",
        checked: ""
    }

    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };

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
            costumeId: this.props.conCostume.costume.id
        }

        // Create the item
        this.props.addCostumeItem(newItem);
    }

    render() {

        const costumeId = this.props.conCostume.costume.id;

        return (

                <Col sm="3" className="costume_packing_list py-4">
                    <div className="d-flex justify-content-between mb-2">
                        <div>
                            <div>
                                <h6 className="mb-0 mr-2">{this.props.conCostume.costume.name}</h6>
                            </div>
                            <div className="subtitle">
                                {this.props.conCostume.costume.outfit}
                            </div>
                        </div>
                        <div><i className="fas fa-edit text-secondary d-print-none" onClick={this.toggle} style={{cursor:'pointer'}}></i></div>
                    </div>
                    <div className="items_box">
                        <Table borderless striped>
                            <tbody>

                                {
                                    this.props.conCostumeItems
                                    .filter(item => item.costumeItem.costumeId === this.props.conCostume.costume.id && item.conCostumeId === this.props.conCostume.id)
                                    .map(item => <ConCostumeItem key={item.id} item={item} conCostumeId={this.props.conCostume.id} {...this.props} />)
                                }

                            </tbody>
                        </Table>
                    </div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Update Costume Items</ModalHeader>
                        <ModalBody>
                            <div className="item_input">
                                <h3>{this.props.conCostume.costume.name}</h3>
                                <Form onSubmit={this.addItem} className="d-flex">
                                    <FormGroup className="w-100 mr-2">
                                        <Label for="itemName" hidden>Item Name</Label>
                                        <Input type="text" required name="itemName" id="itemName"
                                        onChange={this.handleFieldChange} placeholder="Enter an item name" />
                                    </FormGroup>
                                    <div><Button color="primary">Add</Button></div>
                                </Form>
                            </div>
                            <div className="items_box">
                                <Table borderless striped>
                                    <tbody>
                                    {
                                    this.props.costumeItems
                                        .filter(item => item.costumeId === costumeId)
                                        .map(item =>
                                            <CostumeItemCard key={item.id} item={item} {...this.props} />
                                        )
                                    }
                                    </tbody>
                                </Table>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Done</Button>{' '}
                        </ModalFooter>
                    </Modal>
                </Col>
        )
    }
}