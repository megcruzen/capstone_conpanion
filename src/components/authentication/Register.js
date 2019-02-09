import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "../CosBuddy.css";
import AppManager from '../../modules/AppManager';

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


    // // Simplistic handler for login submit
    // handleRegister = (e) => {
    //     e.preventDefault()
    //     sessionStorage.setItem(
    //         "credentials",
    //         JSON.stringify({
    //             name: this.state.username,
    //             email: this.state.email,
    //             id: this.state.id
    //         })
    //     )
    // }

    constructUser = evt => {
        evt.preventDefault();
        AppManager.getAllUsers()
        .then(allUsers => {
            let usernameArray = allUsers.filter(user => {
                console.log(user.username, this.state.username)
                return (user.username === this.state.username)
            })
            let emailArray = allUsers.filter(user => {
                console.log(user.email, this.state.email)
                return (user.email === this.state.email)
            })
            if (usernameArray.length > 0) {
                alert("Sorry, this username is taken.")
            }
            else if (emailArray.length > 0) {
                alert("Sorry, this email is already associated with an account.")
            }
            else {
                alert(`Welcome, ${this.state.username}!`)

                let d = new Date();
                let timestamp = d.getTime();

                const newUser = {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    timestamp: timestamp,
                    usertype: "cosplayer"
                }
                this.props.addUser(newUser)
                    .then(() => {
                        AppManager.getAllUsers()
                            .then(() => {
                            this.props.history.push("/conventions")
                            })
                    })
            }
        })
    }

    render() {
        return (
            <section className="register">
                {/* <form onSubmit={this.handleRegister}> */}
                    <h2>Create an Account</h2>

                    {/* onSubmit={() => this.constructUser()} */}
                    <Form>
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
                        <Button color="primary" onClick={this.constructUser}>Submit</Button>
                    </Form>

                {/* </form> */}
            </section>
        )
    }
}