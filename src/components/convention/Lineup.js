import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import "../CosBuddy.css";
import Timeslot from "./LineupTimeslot"

export default class Lineup extends Component {

    addDay = () => {

        const newDay = {
            userConventionId: this.props.convention.userConventionId,
            title: "New Day"
        }

        this.props.addNewDay(newDay)
    }

    render() {

        console.log("this.props.convention.userConventionId", this.props.convention.userConventionId)
        const days = this.props.lineupDays.filter(day => day.userConventionId === this.props.convention.userConventionId) || {}

        return(
            <section className="lineup_container">
                <Row>
                {
                    days.map(day =>
                        <Col sm="3">
                        <div className={ `day${day.id} lineup_day` }>
                            <h4>{day.title}</h4>
                            <div className="timeslots_container">
                                {
                                    this.props.timeslots.filter(timeslot => timeslot.dayId === day.id)
                                    .map(timeslot =>
                                        <div key={timeslot.id}>
                                            <Timeslot timeslot={timeslot} {...this.props}  />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        </Col>
                    )
                }
                <Col><Button color="primary" onClick={this.addDay}>add day</Button></Col>
                </Row>
            </section>

        )

    }

}