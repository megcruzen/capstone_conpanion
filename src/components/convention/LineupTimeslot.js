import React, { Component } from 'react';
import { } from 'reactstrap';
import "../CosBuddy.css";
import AppManager from "../../modules/AppManager"

export default class Timeslot extends Component {

    // Set initial state
    state = {
        "title": "",
        "text": "",
        "dayId": ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        console.log(evt.target.id, evt.target.value);
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    clickToEdit = () => {
        console.log("Click!")
        AppManager.getTimeslotById(this.props.timeslot.id)
        .then(timeslot => {
            this.setState({
                title: timeslot.title,
                text: timeslot.text,
                dayId: timeslot.dayId
             })
        })
    }

    returnFormOrTitle = (timeslot) => {
        if (this.state.title !== "") {
            return (
                <div className="timeslot_title">
                    <form className="title_edit" onSubmit={console.log("Save me!")} onMouseLeave={console.log("Save me!")}>
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
                <div className="time_title" onClick={this.clickToEdit}>{this.props.timeslot.title}</div>
            )
        }
    }

    returnFormOrText = (timeslot) => {
        if (this.state.text !== "") {
            return (
                <div className="timeslot_text">
                    <form className="text_edit" onSubmit={console.log("Save me!")} onMouseLeave={console.log("Save me!")}>
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
                <div className="time_text" onClick={this.clickToEdit}>{this.props.timeslot.text}</div>
            )
        }
    }

    render() {

        console.log("this.props.timeslot", this.props.timeslot)

        return (

            <section className="timeslot">
                {this.returnFormOrTitle(this.props.timeslot)}
                {this.returnFormOrText(this.props.timeslot)}
            </section>

        )

    }

}