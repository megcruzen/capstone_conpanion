import React, { Component } from 'react'
import { Button, Form, FormGroup, FormText, Label, Input, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import ConCostumeCard from "./ConCostumeCard"
import AppManager from "../../modules/AppManager"

export default class ConventionCostumeList extends Component {

    // Set initial state
    state = {
        costumes: [],
        conCostumes: [],
        filteredCostumes: [],
        costumeId: "",
        modal: false,
        name: "",
        series: "",
        outfit: "",
        notes: "",
        image: ""
      }

    toggle = () => {
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

    displayOptions = () => {

        // if an id in array1 matches an id in array2
        // then remove it
        // and then map through remaining items

        let costumeArray = this.props.costumes.map(costume => costume.id);
        let conCostumeArray = this.props.currentCostumes.map(conCostume => conCostume.costumeId);
        costumeArray = this.props.costumes.filter(val => !conCostumeArray.includes(val.id));

        return costumeArray.map(costume => <option key={costume.id} id={costume.id} value={costume.id}>{costume.name} {costume.outfit}</option>)

    }

    // Create the conCostume object
    constructConnection = event => {
        event.preventDefault();
        event.target.reset();

        if (this.state.costumeId === "") {      // if costume select is empty, alert to select costume
            alert("Please select a costume.")
        }
        else {
            const conCostume = {
                costumeId: Number(this.state.costumeId),
                userConventionId: this.props.convention.userConventionId
            }

            // POST the conCostume object
            this.props.addCostumeToCon(conCostume)
        }
    }

    constructNewCostume = evt => {
        evt.preventDefault()
        let d = new Date();
        let timestamp = d.getTime();
        let sessionUser = sessionStorage.getItem("User");
        const costume = {
            name: this.state.characterName,
            series: this.state.series,
            outfit: this.state.outfit,
            notes: "",
            timestamp: timestamp,
            image: this.state.image,
            userId: Number(sessionUser)
        }

        // Create the costume and add costume to convention
        AppManager.postCostume(costume)
        .then(response => {
            const conCostume = {
                costumeId: Number(response.id),
                userConventionId: this.props.convention.userConventionId
            }
            this.props.addCostumeToCon(conCostume)
        })
    }

    render() {

        return (
            <section className="convention_costume_list">
                <div className="d-sm-flex justify-content-between flex-wrap align-items-center">
                    <h4>Costume List</h4>
                </div>
                <div className="costume_selector">
                    <Form onSubmit={this.constructConnection} className="d-flex">
                        <FormGroup className="mr-2 mb-0">
                            <Label for="costumeId" hidden>Add a costume:</Label>
                            <Input type="select" required name="costumeId" id="costumeId"
                            onChange={this.handleFieldChange}>
                            <option value="" id="" selected>Select a costume</option>
                                {this.displayOptions()}
                            </Input>
                        </FormGroup>
                        <div><Button color="primary">Add</Button></div>
                    </Form>
                    <FormText onClick={this.toggle} className="pt-1 pl-1"><a href="#" className="link">Create a new costume &raquo;</a></FormText>
                </div>
                <Row className="mt-4">
                {
                    // get all conCostume objects
                    this.props.conCostumes
                    // only show those objects where this.props.myConventionId (current convention) = conCostume.userConId
                    .filter(conCostume => this.props.convention.userConventionId === conCostume.userConventionId)
                    .map(conCostume =>
                        <Col sm="4">
                            <ConCostumeCard key={conCostume.id} conCostume={conCostume} {...this.props} />
                        </Col>
                    )
                }
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader>Create New Costume</ModalHeader>
                    <ModalBody>
                        <section className="costume_form">
                            <Form onSubmit={this.constructNewCostume} className="form_width">
                                <FormGroup>
                                    <Label for="characterName">Character Name</Label><span className="required">*</span>
                                    <Input type="text" required name="characterName" id="characterName"
                                    onChange={this.handleFieldChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="series">Outfit</Label>
                                    <Input type="text" name="outfit" id="outfit"
                                    onChange={this.handleFieldChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="series">Series</Label><span className="required">*</span>
                                    <Input type="text" required name="series" id="series"
                                    onChange={this.handleFieldChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="image">Image</Label>
                                    <Input type="url" name="image" id="image" placeholder="Enter an image link" onChange={this.handleFieldChange} />
                                    <FormText>Note: Square images work best.</FormText>
                                </FormGroup>
                                <Button type="submit" onClick={this.toggle} color="primary">Save Costume</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                <div className="required-text">* Required field</div>
                            </Form>
                        </section>
                    </ModalBody>
                </Modal>
            </section>
        )
    }
}