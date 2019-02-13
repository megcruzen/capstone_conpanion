import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Table, Row, Col, Media, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import "../CosBuddy.css";
import thumb from "./64x64.jpg"
import CostumeItemCard from "./CostumeItemCard"

export default class CostumeDetails extends Component {

    // Set initial state
    state = {
        notes: "",
        costumeId: "",
        name: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        // console.log(evt.target.id, evt.target.value);
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
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

     // Add new item to costume
     addItem = event => {
        const costume = this.props.costumes.find(costume => costume.id === parseInt(this.props.match.params.costumeId)) || {}
        event.preventDefault();     // Cancels the default action of the submit.
        event.target.reset();       // Resets values after submit.

        const newItem = {
            name: this.state.itemName,
            costumeId: costume.id
        }

        // Create the item
        this.props.addCostumeItem(newItem);
    }

    deleteCostume = (id) => {
        this.props.deleteCostumeAndDependents(id);
        this.props.history.push("/costumes/");
    }

    render() {
        const costume = this.props.costumes.find(costume => costume.id === parseInt(this.props.match.params.costumeId)) || {}
        return (
                <section key={costume.id} className="mr-2 mb-3 costume_details_section">
                    <a href="#" onClick={() => this.props.history.push("/costumes/")} className="return">&laquo; Return to costumes</a>
                    <Media className="mt-4 pt-2">
                        <Media left className="mr-3 d-flex justify-content-between align-items-center">
                            <Media object src={costume.image} className="thumb" alt={costume.name} />
                        </Media>
                        <Media body>
                            <div className="costume_details">
                                <span className="text-uppercase subtitle">{costume.series}</span>
                                <h3>{costume.name}</h3>
                                <i class="fas fa-user-circle"></i> <span className="series">{costume.outfit}</span>
                            </div>
                            <div className="pt-5">
                                <Link to={{pathname:"/costumes/edit/", state:{id: costume.id, name: costume.name, series: costume.series, outfit: costume.outfit, notes: costume.notes, image: costume.image, timestamp: costume.timestamp, userId: costume.userId}}}><i className="fas fa-edit mr-2 text-secondary" onClick={() => this.props.history.push("/costumes/edit")} style={{cursor:'pointer'}}></i></Link>
                                <i className="fas fa-times-circle delete" onClick={this.toggle} style={{cursor:'pointer'}}></i>
                            </div>
                        </Media>
                    </Media>
                    <Row className="items_and_notes">
                        <Col sm="4" className="mt-4">
                            <h3>Costume Items</h3>
                            <div className="item_input">
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
                                        .filter(item => item.costumeId === costume.id)
                                        .map(item =>
                                            <CostumeItemCard key={item.id} item={item} {...this.props} />
                                        )
                                    }
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        {/* <Col sm={{ size: 5, offset: 1 }} className="mt-4">
                            <h3>Notes</h3>
                            <FormGroup>
                                <Input type="textarea" name="notes" id="notes" rows="10" cols="40" placeholder="Enter notes here..." onClick={this.editNotes} />
                            </FormGroup>
                        </Col> */}
                    </Row>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Remove Costume</ModalHeader>
                        <ModalBody>
                            Are you sure you want to delete <strong>{costume.name}</strong>?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.deleteCostume(costume.id)}>Yes, Please Delete</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </section>
        )
    }
}