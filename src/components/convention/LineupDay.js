import React, { Component } from 'react';
import "../CosBuddy.css";
import Timeslot from "./LineupTimeslot"
import AppManager from "../../modules/AppManager"
export default class LineupDay extends Component {

    // Set initial state
    state = {
        "title": ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        console.log(evt.target.id, evt.target.value);
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    clickToEditTitle = () => {
        AppManager.getDayById(this.props.day.id)
        .then(day => {
            this.setState({ title: day.title })
        })
    }

    returnFormOrText = (day) => {
        if (this.state.title !== "") {
            return (
                <div className="day_title">
                    <form className="title_edit" onSubmit={this.updateDayTitle} onBlur={this.updateDayTitle}>
                        <input type="text" required
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="title"
                        value={this.state.title} />
                    </form>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="text-right"><i className="fas fa-times-circle text-dark" onClick={() => this.props.deleteDay(this.props.day.id)} style={{cursor:'pointer'}}></i></div>
                    <div className="text-center" onClick={this.clickToEditTitle}><h5>{this.props.day.title} {this.props.day.id}</h5></div>
                </div>
            )
        }
    }

    updateDayTitle = evt => {
        evt.preventDefault();

        const day = {
            title: this.state.title,
            userConventionId: this.props.day.userConventionId
        }

        this.props.updateDay(this.props.day.id, day)
        .then(() => { this.setState({ title: "" }) })
    }

    addTimeslot = () => {

        const newTimeslot = {
            title: "Title",
            text: "Enter details here",
            dayId: this.props.day.id
        }

        this.props.addTimeslot(newTimeslot)
    }

    render() {

        console.log("this.props.convention.userConventionId", this.props.convention.userConventionId)
        // const days = this.props.lineupDays.filter(day => day.userConventionId === this.props.convention.userConventionId) || {}

        return (
            <div className={ `day${this.props.day.id} lineup_day` }>
                {this.returnFormOrText(this.props.day)}
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
                <div className="add_timeslot"><i class="fas fa-plus-circle" onClick={this.addTimeslot}></i></div>
            </div>

        )

    }

}