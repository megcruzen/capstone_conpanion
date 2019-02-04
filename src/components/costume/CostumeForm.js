import React, { Component } from "react"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class CostumeForm extends Component {

    // Set initial state
    state = {
        name: "",
        series: "",
        outfit: "",
        notes: "",
        timestamp: "",
        image: "",
        userId: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        console.log(evt.target.id, evt.target.value);
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewCostume = evt => {
        evt.preventDefault()
        let d = new Date();
        let timestamp = d.getTime();
        const costume = {
            name: this.state.characterName,
            series: this.state.series,
            outfit: this.state.outfit,
            notes: "",
            timestamp: timestamp,
            image: this.state.image,
            userId: 1
        }

        // Create the costume and then redirect user to their costume list
        this.props.addCostume(costume)
        .then(() => this.props.history.push("/costumes"))
    }

    render() {
        return (
            <section className="costume_form">
                <h1>Add New Costume</h1>
                <Form onSubmit={this.constructNewCostume} className="form_width mt-4">
                    <FormGroup>
                        <Label for="characterName">Character Name</Label>
                        <Input type="text" required name="characterName" id="characterName"
                        onChange={this.handleFieldChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="series">Outfit</Label>
                        <Input type="text" name="outfit" id="outfit"
                        onChange={this.handleFieldChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="series">Series</Label>
                        <Input type="text" required name="series" id="series"
                        onChange={this.handleFieldChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="image">Image</Label>
                        <Input type="url" required name="image" id="image" placeholder="Enter an image link" onChange={this.handleFieldChange} />
                    </FormGroup>
                    <Button type="submit" color="primary" className="mr-3">Save Costume</Button>
                    <a href="#" onClick={() => this.props.history.push("/costumes/")} className="cancel">Cancel</a>
                </Form>
            </section>
        )
    }
}