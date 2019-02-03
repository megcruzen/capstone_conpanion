import React, { Component } from 'react'
import { Button, Table } from 'reactstrap'
import "../CosBuddy.css"
import ConventionCard from "./ConventionCard"

export default class ConventionList extends Component {
    render() {
        return (
            <section className="convention_list_personal">
                <div className="d-sm-flex justify-content-between flex-wrap align-items-center mb-3">
                    <div><h1 className="text-center">My Conventions</h1></div>
                    <div className="text-center"><Button color="primary">Add Convention</Button></div>
                </div>
                <Table striped borderless>
                    <tbody>
                        {
                            this.props.myConventions.map(myConvention =>
                                <ConventionCard key={myConvention.id} myConvention={myConvention} {...this.props} />
                            )
                        }
                    </tbody>
                </Table>
            </section>
        )
    }
}