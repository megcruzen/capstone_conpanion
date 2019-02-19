import React, { Component } from "react"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class GroupEditForm extends Component {

    state = {
        name: this.props.location.state.name,
        description: this.props.location.state.description,
        timestamp: this.props.location.state.timestamp,
        userId: this.props.location.state.userId
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Create new group object to replace existing
    reconstructGroup = evt => {
        evt.preventDefault()
        const groupId = this.props.location.state.id;
        const editedGroup = {
            name: `${this.state.name}`,
            description: `${this.state.description}`,
            timestamp: `${this.state.timestamp}`,
            userId: `${this.state.userId}`
        }

        this.props.editGroup(groupId, editedGroup)
        .then(() => this.props.history.push(`/groups/${this.props.location.state.id}`))
    }

    render() {
        console.log(this.props.location.state.id)
        return (
            <section className="group_edit_form">
                <h1>Edit Group</h1>
                <Form onSubmit={this.reconstructGroup} className="form_width mt-4">
                    <FormGroup>
                        <Label for="name">Group Name</Label><span className="required">*</span>
                        <Input type="text"
                            required
                            name="name"
                            id="name"
                            onChange={this.handleFieldChange}
                            value={`${this.state.name}`} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label><span className="required">*</span>
                        <Input type="text"
                            required
                            name="description"
                            id="description"
                            onChange={this.handleFieldChange}
                            value={`${this.state.description}`} />
                    </FormGroup>
                    {/* <FormGroup>
                        <Label for="convention">Convention</Label>
                        <Input type="select" name="convention" id="convention"
                        onChange={this.handleFieldChange}>
                        <option value="0">N/A</option>
                            {
                                this.props.allConventions.map(convention => <option key={convention.id} id={convention.id} value={convention.id}>{convention.name}</option>)
                            }
                        </Input>
                    </FormGroup> */}
                    <Button type="submit" color="primary" className="mr-3">Save Group</Button>
                    <a href="#" onClick={() => this.props.history.push(`/groups/${this.props.location.state.id}`)} className="cancel">Cancel</a>
                </Form>
                <div className="required-text">* Required field</div>
            </section>
        )
    }
}