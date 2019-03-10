import React, { Component } from "react";
// import { NavbarBrand, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "../CosBuddy.css";

export default class Welcome extends Component {

    componentDidMount() {
        this.props.getAllData();
      }

    showName() {
        let sessionUser = sessionStorage.getItem("User");
        const currentUser = this.props.users.find(user => user.id === Number(sessionUser)) || {}
        return <h2>Welcome, <span>{currentUser.username}</span>!</h2>;
    }

    render() {

        return (
            <section className="welcome">
                {this.showName()}
            </section>
        )
    }
}