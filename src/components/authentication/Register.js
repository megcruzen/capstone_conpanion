import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "../CosBuddy.css";

export default class Register extends Component {

    // Set initial state
    state = {
        username: "",
        email: "",
        id: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }


    // Simplistic handler for login submit
    handleRegister = (e) => {
        e.preventDefault()
        sessionStorage.setItem(
            "credentials",
            JSON.stringify({
                name: this.state.username,
                email: this.state.email,
                id: this.state.id
            })
        )
    }

    constructNewUser = () => {

        let d = new Date();
        let timestamp = d.getTime();

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            timestamp: timestamp,
            usertype: "cosplayer"
        }

        this.props.addUser(user).then(response => {
            console.log(response)
            this.props.history.push("/")
        })
    }

    render() {
        return (
            <section className="register">
                <form onSubmit={this.handleRegister}>
                    <h2>Create an Account</h2>

                    {/* {this.constructNewUser()} */}

                    <Form onSubmit={() => this.constructNewUser()}>
                        <FormGroup>
                            <Label for="username" hidden>Username</Label>
                            <Input type="username" name="username" id="username" placeholder="Username"
                            onChange={this.handleFieldChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email" hidden>Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Email"
                            onChange={this.handleFieldChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" hidden>Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Password"
                            onChange={this.handleFieldChange} required />
                        </FormGroup>
                        <Button color="primary">Submit</Button>
                    </Form>

                </form>
            </section>
        )
    }
}