import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import "../CosBuddy.css";
import LineupDay from "./LineupDay"

export default class Lineup extends Component {

    addDay = () => {

        const newDay = {
            userConventionId: this.props.convention.userConventionId,
            title: "New Day"
        }

        this.props.addNewDay(newDay)
    }

    showAddDayButton = () => {
        if (this.props.lineupDays.length < 5) {
            return (
                <i class="far fa-calendar-plus" onClick={this.addDay}></i>
            )
        }
    }

    render() {

        // console.log("this.props.convention.userConventionId", this.props.convention.userConventionId)
        const days = this.props.lineupDays.filter(day => day.userConventionId === this.props.convention.userConventionId) || {}

        return(
            <section className="lineup_container">
                <Row>
                {
                    days.map(day =>
                        <Col sm="3" key={day.id}>
                            <LineupDay day={day} {...this.props}  />
                        </Col>
                    )
                }
                    <Col className="add_day">
                        {this.showAddDayButton()}
                    </Col>
                </Row>
            </section>

        )

    }

}