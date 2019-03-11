import React, { Component } from 'react';
import { } from 'reactstrap';
import "../Conpanion.css";
import AppManager from "../../modules/AppManager"

export default class Timeslot extends Component {

    // Set initial state
    state = {
        title: "",
        text: "",
        titleCheck: false,
        textCheck: false
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
            this.setState({ title: timeslot.title, titleCheck: true })
        })
    }

    clickToEditText = () => {
        AppManager.getTimeslotById(this.props.timeslot.id)
        .then(timeslot => {
            this.setState({ text: timeslot.text, textCheck: true })
        })
    }

    returnFormOrTitle = (timeslot) => {
        if (this.state.titleCheck) {
            return (
                <form className="title_edit" onSubmit={this.updateTimeslotTitle} onMouseLeave={this.updateTimeslotTitle} autocomplete="off">
                    <input type="text" required
                    className="form-control"
                    onChange={this.handleFieldChange}
                    id="title"
                    value={this.state.title} />
                </form>
            )
        } else {
            return (
                <div className="py-2" onClick={this.clickToEditTitle}>{this.props.timeslot.title}</div>
            )
        }
    }

    returnFormOrText = (timeslot) => {
        if (this.state.textCheck) {
            return (
                <div className="timeslot_text">
                    <form className="text_edit" onSubmit={this.updateTimeslotText} onMouseLeave={this.updateTimeslotText} autocomplete="off">
                        <input type="text" required
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="text"
                        value={this.state.text}
                        placeholder="Enter details" />
                    </form>
                </div>
            )
        } else {
            return (
                <div className="timeslot_text" onClick={this.clickToEditText}>{this.props.timeslot.text}</div>
            )
        }
    }

    updateTimeslotTitle = evt => {
        evt.preventDefault();

        const timeslot = {
            title: this.state.title,
            text: this.props.timeslot.text,
            dayId: this.props.timeslot.dayId,
        }

        this.props.updateTimeslot(this.props.timeslot.id, timeslot)
        .then(() => { this.setState({ titleCheck: false }) })
    }

    updateTimeslotText = evt => {
        evt.preventDefault();

        const timeslot = {
            title: this.props.timeslot.title,
            text: this.state.text,
            dayId: this.props.timeslot.dayId
        }

        this.props.updateTimeslot(this.props.timeslot.id, timeslot)
        .then(() => { this.setState({ textCheck: false }) })
    }

    render() {

        return (

            <>
                <div className="timeslot_title d-flex justify-content-between">
                    <div className="w15">&nbsp;</div>
                    <div className="timeslot_title">
                        {this.returnFormOrTitle(this.props.timeslot)}
                    </div>
                    <div className="w15"><i className="fas fa-times-circle text-dark" onClick={() => this.props.deleteTimeslot(this.props.timeslot.id)} style={{cursor:'pointer'}}></i></div>
                </div>

                {this.returnFormOrText(this.props.timeslot)}
            </>

        )

    }

}