import React, { Component } from 'react'
import { FormGroup, Form, Input, Table } from 'reactstrap';
import "../CosBuddy.css"
import AppManager from "../../modules/AppManager"
import ConSearchResults from "./ConSearchResults"

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
            <section className="convention_search">
                <h4>Search by Name, City, or State</h4>
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
                        {/* loop through array of results and render */}
                        {this.state.conventions.map(result => (
                            <ConSearchResults key={result.id} result={result} {...this.props} />
                    ))}
                    </tbody>
                </Table>

                <div>Can't find a convention? <a href="#" onClick={() => this.props.history.push("/conventions/new")} className="link">Add it here!</a>
                </div>

            </section>
        )
    }
}