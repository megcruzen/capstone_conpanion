import React, { Component } from 'react'
import { Button, Table } from 'reactstrap'
import "../CosBuddy.css"
import ConventionCard from "./ConventionCard"

export default class ConventionList extends Component {

    sortDate = (a, b) => {
        let date1 = new Date(a.startDate);
        let date2 = new Date(b.startDate)
        return date1 - date2;
    }

    render() {

        // console.log("this.props.myConventions", this.props.myConventions.map(convention => convention.userConventionId))
        return (
            <section className="convention_list_personal">
                <div className="d-sm-flex justify-content-between flex-wrap align-items-center mb-3">
                    <div><h1 className="text-center">My Conventions</h1></div>
                    <div className="text-center"><Button color="primary" onClick={() => this.props.history.push("/conventions/search")}>Add Convention</Button></div>
                </div>
                <Table striped borderless>
                    <tbody>
                        {
                            this.props.myConventions
                            .sort(this.sortDate)
                            .map(convention =>
                                <ConventionCard key={convention.userConventionId} convention={convention} {...this.props} />
                            )
                        }
                    </tbody>
                </Table>
            </section>
        )
    }
}