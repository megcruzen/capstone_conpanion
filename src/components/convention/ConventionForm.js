import React, { Component } from "react"
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class ConventionForm extends Component {

    // Set initial state
    state = {
        name: "",
        genreId: "",
        startDate: "",
        endDate: "",
        city: "",
        state: "",
        website: "",
        thumbnail: "",
        userId: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        console.log(evt.target.id, evt.target.value);
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewConvention = evt => {
        evt.preventDefault()
        let sessionUser = sessionStorage.getItem("User");

        const convention = {
            name: this.state.conventionName,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            city: this.state.city,
            state: this.state.state,
            website: this.state.website,
            thumbnail: this.state.thumbnail,
            genreId: this.state.select,
            userId: Number(sessionUser)
        }

        // Create the convention and then redirect user to their convention list
        this.props.addConvention(convention)
        .then(() => this.props.history.push("/conventions"))
    }

    render() {
        return (
            <section className="convention_form">
                <h1>Add a Convention</h1>
                <Form onSubmit={this.constructNewConvention} className="form_width mt-4">
                <Row form>
                        <Col md={8}>
                            <FormGroup>
                                <Label for="conventionName">Convention Name</Label>
                                <Input type="text" required name="conventionName" id="conventionName"
                                onChange={this.handleFieldChange} placeholder="e.g. DragonCon" />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="genre">Genre</Label>
                                <Input type="select" required name="select" id="select"
                                onChange={this.handleFieldChange}>
                                <option value="">Select a genre</option>
                                    {
                                        this.props.genres.map(genre => <option key={genre.id} id={genre.id} value={genre.id}>{genre.name}</option>)
                                    }
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="startDate">Start Date</Label>
                                <Input type="date" required name="startDate" id="startDate"
                                onChange={this.handleFieldChange} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                            <Label for="endDate">End Date</Label>
                            <Input type="date" required name="endDate" id="endDate"
                            onChange={this.handleFieldChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={8}>
                            <FormGroup>
                                <Label for="city">City</Label>
                                <Input type="text" required name="city" id="city"
                                onChange={this.handleFieldChange} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="state">State</Label>
                                <Input type="text" required name="state" id="state"
                                onChange={this.handleFieldChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="website">Website</Label>
                        <Input type="url" required name="website" id="website" placeholder="http://conventionname.com"
                        onChange={this.handleFieldChange} />
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <Label for="thumbnail">Logo</Label>
                        <Input type="url" name="thumbnail" id="thumbnail" placeholder="Enter an image link" onChange={this.handleFieldChange} />
                    </FormGroup>
                    <Button type="submit" color="primary" className="mr-3">Save Convention</Button>
                    <a href="#" onClick={() => this.props.history.push("/conventions/search")} className="cancel">Cancel</a>
                </Form>
            </section>
        )
    }
}