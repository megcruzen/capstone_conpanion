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

    addDayExample = () => {

        const exampleDay = {
            userConventionId: this.props.convention.userConventionId,
            title: "Friday"
        }

        this.props.addNewDay(exampleDay)
    }

    showAddDayButton = () => {
        const days = this.props.lineupDays.filter(day => day.userConventionId === this.props.convention.userConventionId)
        if (days.length === 0) {
            return (
                <Button color="primary" className="build_lineup" onClick={this.addDayExample}><i className="far fa-calendar-plus mr-2"></i>Start Building Your Lineup!</Button>
            )
        }
        else if (days.length < 5) {
            return (
                <Button color="primary" onClick={this.addDay}><i className="far fa-calendar-plus mr-2"></i> Add Day</Button>
            )
        }
    }

    render() {

        // console.log("this.props.convention.userConventionId", this.props.convention.userConventionId)
        const days = this.props.lineupDays.filter(day => day.userConventionId === this.props.convention.userConventionId) || {}

        return(
            <section className="lineup_container">
            <h4>Lineup</h4>
                <Row>
                {
                    days.map(day =>
                        <Col sm="2" key={day.id} className={ `day${day.id} lineup_day` }>
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