import React, { Component } from "react"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class GroupForm extends Component {

    // Set initial state
    state = {
        name: "",
        description: "",
        timestamp: "",
        conventionId: "",
        userId: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        console.log(evt.target.id, evt.target.value);
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewGroup = evt => {
        evt.preventDefault()
        let d = new Date();
        let timestamp = d.getTime();
        let sessionUser = sessionStorage.getItem("User");

        const group = {
            name: this.state.groupName,
            description: this.state.description,
            timestamp: timestamp,
            conventionId: 1,
            userId: Number(sessionUser)
        }

        // Create the group and then redirect user to their group list
        this.props.createGroup(group)
        .then(() => this.props.history.push("/groups"))
    }

    render() {
        return (
            <section className="group_form">
                <h1>Create New Group</h1>
                <Form onSubmit={this.constructNewGroup} className="form_width mt-4">
                    <FormGroup>
                        <Label for="groupName">Group Name</Label><span className="required">*</span>
                        <Input type="text" required name="groupName" id="groupName"
                        onChange={this.handleFieldChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label><span className="required">*</span>
                        <Input type="text" required name="description" id="description"
                        onChange={this.handleFieldChange} />
                    </FormGroup>
                    <Button type="submit" color="primary" className="mr-3">Save Group</Button>
                    <a href="#" onClick={() => this.props.history.push("/groups/")} className="cancel">Cancel</a>
                </Form>
                <div className="required-text">* Required field</div>
            </section>
        )
    }
}