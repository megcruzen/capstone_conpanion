import React, { Component } from "react"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class GroupForm extends Component {

    // Set initial state
    state = {
        name: "",
        description: "",
        timestamp: "",
        userId: "",
        conventionId: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
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
            userId: Number(sessionUser),
            conventionId: Number(this.state.conventionId)
        }

        // Create the group and then redirect user to their group list
        this.props.createGroup(group)
        .then(() => this.props.history.push("/groups"))
    }

    getYear = (convention) => {
        const startDate = new Date(convention.startDate);
        const startYear = startDate.getFullYear();
        return startYear;
    }

    render() {
        return (
            <section className="group_form">
                <h1>Create New Group</h1>
                <Form onSubmit={this.constructNewGroup} className="form_width mt-4">
                    <FormGroup>
                        <Label for="groupName">Group Name</Label><span className="required">*</span>
                        <Input type="text"
                            required
                            name="groupName"
                            id="groupName"
                            onChange={this.handleFieldChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label><span className="required">*</span>
                        <Input type="text"
                            required
                            name="description"
                            id="description"
                            onChange={this.handleFieldChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="convention">Convention</Label>
                        <Input type="select"
                            name="conventionId"
                            id="conventionId"
                            onChange={this.handleFieldChange}
                            value={this.state.conventionId}>
                            <option value="0">N/A</option>
                            {
                                this.props.allConventions.map(convention => <option key={convention.id} id={convention.id} value={convention.id}>{convention.name} {this.getYear(convention)}</option>)
                            }
                        </Input>
                    </FormGroup>
                    <Button type="submit" color="primary" className="mr-3">Save Group</Button>
                    <a href="#" onClick={() => this.props.history.push("/groups/")} className="cancel">Cancel</a>
                </Form>
                <div className="required-text">* Required field</div>
            </section>
        )
    }
}