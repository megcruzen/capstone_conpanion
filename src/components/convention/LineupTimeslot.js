import React, { Component } from 'react';
import { } from 'reactstrap';
import "../CosBuddy.css";

export default class Timeslot extends Component {

    render() {

        return (

            <section className="timeslot">
                <div className="time_title">{this.props.timeslot.title}</div>
                <div className="time_text">{this.props.timeslot.text}</div>
            </section>

        )

    }

}