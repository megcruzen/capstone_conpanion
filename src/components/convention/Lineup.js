import React, { Component } from 'react';
import { } from 'reactstrap';
import "../CosBuddy.css";
import Timeslot from "./LineupTimeslot"

export default class Lineup extends Component {

    render() {

        console.log("this.props.days", this.props)
        const days = this.props.lineupDays.filter(day => day.userConventionId === this.props.convention.userConventionId) || {}

        return(
            <section className="lineup_container d-flex justify-content-between flex-wrap">
                {
                    days.map(day =>
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
                    )
                }
            </section>

        )

    }

}