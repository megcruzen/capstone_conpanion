import React, { Component } from "react"
import { Button, Form, FormGroup, FormText, Label, Input } from 'reactstrap';

export default class CostumeEditForm extends Component {

    // Set initial state
    state = {
        name: this.props.location.state.name,
        series: this.props.location.state.series,
        outfit: this.props.location.state.outfit,
        notes: this.props.location.state.notes,
        timestamp: this.props.location.state.timestamp,
        image: this.props.location.state.image,
        userId: this.props.location.state.userId
    }

    // consoleLog() {
    //     console.log("state:", this.props.location.state);
    // }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        console.log(evt.target.id, evt.target.value);
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Create new costume object to replace existing
    // Call the function passed from parent component to PUT new data
    reconstructCostume = evt => {
        evt.preventDefault()
        const costumeId = this.props.location.state.id;
        const editedCostume = {
            name: `${this.state.name}`,
            series: `${this.state.series}`,
            outfit: `${this.state.outfit}`,
            notes: `${this.state.notes}`,
            timestamp: `${this.state.timestamp}`,
            image: `${this.state.image}`,
            userId: `${this.state.userId}`
        }

        // Create the costume and then redirect user to costume's details
        this.props.editCostume(costumeId, editedCostume)
        .then(() => this.props.history.push(`/costumes/${this.props.location.state.id}`))
    }

    render() {
        return (
            <section className="costume_form">
                <h1>Edit Costume</h1>
                <Form onSubmit={this.reconstructCostume} className="form_width mt-4 mb-4">
                    <FormGroup>
                        <Label for="characterName">Character Name</Label>
                        <Input type="text" required name="characterName" id="characterName"
                        onChange={this.handleFieldChange}
                        value={`${this.state.name}`} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="series">Outfit</Label>
                        <Input type="text" name="outfit" id="outfit"
                        onChange={this.handleFieldChange}
                        value={`${this.state.outfit}`}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="series">Series</Label>
                        <Input type="text" required name="series" id="series"
                        onChange={this.handleFieldChange}
                        value={`${this.state.series}`} />
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <Label for="image">Image</Label>
                        <Input type="url" required name="image" id="image" placeholder="Enter an image link" onChange={this.handleFieldChange}
                        value={`${this.state.image}`} />
                        <FormText>Note: Square images work best.</FormText>
                    </FormGroup>
                    <Button type="submit" color="primary" className="mr-3">Save Costume</Button>
                    <a href="#" onClick={() => this.props.history.push(`/costumes/${this.props.location.state.id}`)} className="cancel">Cancel</a>
                </Form>
            </section>
        )
    }
}