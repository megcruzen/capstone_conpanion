import React, { Component } from 'react'
import { FormGroup, Form, Input, Media, Table, Button } from 'reactstrap';
import "../CosBuddy.css"
import thumb from "./64x64.jpg"
import AppManager from "../../modules/AppManager"

export default class ConSearchName extends Component {

    state = {
        searchQuery: "",
        conventions: []
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        console.log(evt.target.id, evt.target.value);
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleSearch = evt => {
        evt.preventDefault();
        this.searchConventions(this.state.searchQuery)
        .then(() => this.props.history.push("/conventions/search"));
    }

    searchConventions = (searchQuery) => {
        const newSearchResults = {}
        return AppManager.searchConventions(searchQuery)
        .then(response => newSearchResults.conventions = response)
        .then(() => this.setState(newSearchResults))

        // .then(conventions => {
        //     this.setState({ conventions: newSearchResults })
        // })
    }

    render() {
        return (
            <section className="convention_name_search">
                <h4>Search by Name</h4>
                    <div className="my-1">
                        <FormGroup>
                            <Form className="searchForm" onSubmit={this.handleSearch}>
                            {/* The input field id must match the key of the property that reflects the user input in state */}
                                <Input type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="searchQuery"
                                        placeholder="Search..." />
                            </Form>
                        </FormGroup>
                    </div>

                    <Table striped borderless className="name_results">
                        <tbody>
                        {/* loop through array of results and render the name */}
                        {this.state.conventions.map(result => (
                        <tr>
                            <td>
                                <Media className="pt-2 px-2">
                                    <Media left href="#" className="mr-3">
                                            <Media object src={thumb} className="thumb" alt="" />
                                    </Media>
                                    <Media body className="d-flex flex-wrap justify-content-between align-items-center">
                                        <div className="con_details">
                                            <h4>{result.name}</h4>
                                            {result.startDate} - {result.endDate}
                                            <br />
                                            {result.city}, {result.state}
                                        </div>
                                        <div>
                                            <Button color="primary">Add to My Conventions</Button>
                                        </div>
                                    </Media>
                                </Media>
                            </td>
                        </tr>
                        ))}
                        </tbody>
                    </Table>

                    <div>Can't find a convention? <a href="#" onClick={() => this.props.history.push("/conventions/new")} className="link">Add it here!</a>
                    </div>
            </section>
        )
    }
}