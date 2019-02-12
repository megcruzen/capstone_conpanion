import React, { Component } from 'react';
import { } from 'reactstrap';
import "../CosBuddy.css";
import AppManager from "../../modules/AppManager"

export default class Timeslot extends Component {

    // Set initial state
    state = {
        "title": "",
        "text": ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        console.log(evt.target.id, evt.target.value);
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    clickToEditTitle = () => {
        AppManager.getTimeslotById(this.props.timeslot.id)
        .then(timeslot => {
            this.setState({ title: timeslot.title })
        })
    }

    clickToEditText = () => {
        AppManager.getTimeslotById(this.props.timeslot.id)
        .then(timeslot => {
            this.setState({ text: timeslot.text })
        })
    }

    returnFormOrTitle = (timeslot) => {
        if (this.state.title !== "") {
            return (
                <div className="timeslot_title">
                    <form className="title_edit" onSubmit={this.updateTimeslotTitle} onMouseLeave={this.updateTimeslotTitle}>
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
                <div className="time_title" onClick={this.clickToEditTitle}>{this.props.timeslot.title}</div>
            )
        }
    }

    returnFormOrText = (timeslot) => {
        if (this.state.text !== "") {
            return (
                <div className="timeslot_text">
                    <form className="text_edit" onSubmit={this.updateTimeslotText} onMouseLeave={this.updateTimeslotText}>
                        <input type="text" required
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="text"
                        value={this.state.text} />
                    </form>
                </div>
            )
        } else {
            return (
                <div className="time_text" onClick={this.clickToEditText}>{this.props.timeslot.text}</div>
            )
        }
    }

    updateTimeslotTitle = evt => {
        evt.preventDefault();

        const timeslot = {
            title: this.state.title,
            text: this.props.timeslot.text,
            dayId: this.props.timeslot.dayId
        }

        this.props.updateTimeslot(this.props.timeslot.id, timeslot)
        .then(() => { this.setState({ title: "" }) })
    }

    updateTimeslotText = evt => {
        evt.preventDefault();

        const timeslot = {
            title: this.props.timeslot.title,
            text: this.state.text,
            dayId: this.props.timeslot.dayId
        }

        this.props.updateTimeslot(this.props.timeslot.id, timeslot)
        .then(() => { this.setState({ text: "" }) })
    }

    render() {

        console.log("this.props.timeslot.title", this.props.timeslot.title)

        return (

            <section className="timeslot">
                {this.returnFormOrTitle(this.props.timeslot)}
                {this.returnFormOrText(this.props.timeslot)}
            </section>

        )

    }

}