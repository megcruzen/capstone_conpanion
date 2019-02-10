import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import AppManager from '../../modules/AppManager';
import "../CosBuddy.css";


export default class Login extends Component {

    // Set initial state
    state = {
        username: "",
        password: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    userLogin = evt => {
        evt.preventDefault();
        AppManager.checkForUser(this.state.username, this.state.password)
            .then(userData => {
                console.log("userArray:", userData)
                if (userData.length === 0) {
                    alert("Your username and password do not match. Please try again.")
                } else {
                    userData.forEach(user => {
                        let loggedIn = false;
                        if (this.state.username === user.username && this.state.password === user.password) {
                            loggedIn = true;
                        }
                        if (loggedIn === true) {
                            sessionStorage.setItem("User", user.id)
                            let sessionUser = sessionStorage.getItem("User")
                            console.log("sessionUser", sessionUser)
                            this.props.history.push("/conventions")
                        }
                    })
                }
        })
    }

    render() {
        return (
            <section className="login">
                    <h1 className="text-center">Welcome to CosBuddy!</h1>

                    <div className="login_form my-4">
                        <Form inline onSubmit={this.userLogin}>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="username" hidden>Username</Label>
                                <Input type="text" name="username" id="username"
                                onChange={this.handleFieldChange} required placeholder="Username" />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="password" hidden>Password</Label>
                                <Input type="password" name="password" id="password"
                                onChange={this.handleFieldChange} required placeholder="Password" />
                            </FormGroup>
                            <Button color="primary">Submit</Button>
                        </Form>
                    </div>

                    <div className="text-center">
                        New to CosBuddy? <a href="#" onClick={() => this.props.history.push("/register")} className="link">Sign up now!</a>
                    </div>

            </section>
        )
    }
}