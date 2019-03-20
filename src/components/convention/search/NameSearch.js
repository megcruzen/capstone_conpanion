import React, { Component } from 'react'
import { FormGroup, Form, Input, Table } from 'reactstrap';
import "../../Conpanion.css"
import AppManager from "../../../modules/AppManager"
import ConSearchResults from "./SearchResults"

export default class NameSearch extends Component {

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

    sortDate = (a, b) => {
        let date1 = new Date(a.startDate);
        let date2 = new Date(b.startDate)
        return date1 - date2;
    }

    searchConventions = (searchQuery) => {
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();

        if (day < 10) {
            day = `0${day}`;
        }
        if (month < 10) {
            month = `0${month}`
        }

        let yesterday = day - 1;
        let endOfYesterday = `${year}-${month}-${yesterday}`
        // console.log(new Date(endOfYesterday));

        // const newSearchResults = {}
        return AppManager.searchConventions(searchQuery)
        // .then(response => newSearchResults.conventions = response)
        // .then(() => this.setState(newSearchResults))
        // .then(conventions => this.setState({ conventions: conventions }))
        .then(conventions =>
            conventions.sort(this.sortDate)
                       .filter(con => (new Date(con.endDate) - new Date(endOfYesterday)) > 0)
        )
        .then(conventions => this.setState({ conventions: conventions }))
    }

    showResults = () => {
        if (this.state.conventions.length > 0) {
            return (
                this.state.conventions
                    .map(result => (
                    <ConSearchResults key={result.id} result={result} {...this.props} />
                    ))
            )
        }
        // else {
        //     return <p>No results found.</p>
        // }
    }

    render() {

        return (
            <section className="convention_search">
                <h4>Search by Name, City, or State</h4>
                <div className="my-1">
                    <FormGroup>
                        <Form className="searchForm" onSubmit={this.handleSearch}>
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
                        {
                            // this.state.conventions
                            // .map(result => (
                            // <ConSearchResults key={result.id} result={result} {...this.props} />
                            // ))

                            this.showResults()
                        }
                    </tbody>
                </Table>

                <div>Can't find a convention? <a href="#" onClick={() => this.props.history.push("/conventions/new")} className="link">Add it here!</a>
                </div>

            </section>
        )
    }
}