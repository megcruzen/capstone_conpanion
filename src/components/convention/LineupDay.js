import React, { Component } from 'react';
import { Button } from 'reactstrap';
import "../CosBuddy.css";
import Timeslot from "./LineupTimeslot"

export default class LineupDay extends Component {

    addTimeslot = () => {

        const newTimeslot = {
            title: "Title",
            text: "Enter details here",
            dayId: this.props.day.id
        }

        this.props.addTimeslot(newTimeslot)
    }

    render() {
        console.log("this.props.dayId", this.props.day.id)

        console.log("this.props.convention.userConventionId", this.props.convention.userConventionId)
        // const days = this.props.lineupDays.filter(day => day.userConventionId === this.props.convention.userConventionId) || {}

        return (
            <div className={ `day${this.props.day.id} lineup_day` }>
                <h4>{this.props.day.title}</h4>
                <div className="timeslots_container">
                    {
                        this.props.timeslots.filter(timeslot => timeslot.dayId === this.props.day.id)
                        .map(timeslot =>
                            <div key={timeslot.id}>
                                <Timeslot timeslot={timeslot} dayId={this.props.day.id} {...this.props}  />
                            </div>
                        )
                    }
                </div>
                <div className="text-center"><Button color="primary" onClick={this.addTimeslot}>add timeslot</Button></div>
            </div>

        )

    }

}