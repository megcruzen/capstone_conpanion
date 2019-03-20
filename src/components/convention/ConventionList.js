import React, { Component } from 'react'
import { Button, Table } from 'reactstrap'
import "../Conpanion.css"
import ConventionCard from "./ConventionCard"

export default class ConventionList extends Component {

    sortDate = (a, b) => {
        let date1 = new Date(a.startDate);
        let date2 = new Date(b.startDate)
        return date1 - date2;
    }

    render() {

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
        console.log(new Date(endOfYesterday));

        const upcomingConventions = this.props.myConventions
        .filter(con => (new Date(con.endDate) - new Date(endOfYesterday)) > 0);
        console.log(upcomingConventions);

        const pastConventions = this.props.myConventions
        .filter(con => (new Date(con.endDate) - new Date(endOfYesterday)) < 0);
        console.log(upcomingConventions);

        return (
            <section className="convention_list_personal">
                <div className="d-sm-flex justify-content-between flex-wrap align-items-center mb-3">
                    <div><h1 className="text-center">My Conventions</h1></div>
                    <div className="text-center"><Button color="primary" onClick={() => this.props.history.push("/conventions/search")}>Add Convention</Button></div>
                </div>
                <Table striped borderless>
                    <tbody>
                        {
                            upcomingConventions
                            .sort(this.sortDate)
                            .map(convention =>
                                <ConventionCard key={convention.userConventionId} convention={convention} {...this.props} />
                            )
                        }
                    </tbody>
                </Table>

                <h2>Past Conventions</h2>
                <Table striped borderless>
                    <tbody>
                        {
                            // this.props.myConventions
                            pastConventions
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