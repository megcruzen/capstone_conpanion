import React, { Component } from 'react'

export default class Contact extends Component {

    render() {
        return (
            <section className="contact">
                <h1>Contact Us</h1>
                <p>Need to contact us? <a href="mailto:megcruzen@gmail.com" className="link">Just shoot us an email!</a></p>
            </section>
        )
    }
}