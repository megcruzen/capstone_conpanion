import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavbarBrand, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import AppManager from '../../modules/AppManager';
import "../CosBuddy.css";
import auth0Client from "../../Auth"


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
                            sessionStorage.setItem("User", user.id);
                            this.props.getAllData();
                        }
                    })
                }
            })
            .then(() => this.props.history.push("/conventions"))
    }

    signOut = () => {
        auth0Client.signOut();
        this.props.history.replace('/');
    }

    render() {
        return (
            <section className="login">
                <div className="logo text-center"><NavbarBrand tag={Link} to="/"><span className="nav-highlight">con</span>panion</NavbarBrand></div>
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

                {/* <div>
                    Auth0 code that checks if user is logged in. If they are, display profile name and sign out button. If they are not, display sign in button.
                    {
                        !auth0Client.isAuthenticated() &&
                        <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
                    }
                    {
                        auth0Client.isAuthenticated() &&
                        <div>
                        <label className="mr-2">{auth0Client.getProfile().name}</label>
                        <button className="btn btn-dark" onClick={() => {this.signOut()}}>Sign Out</button>
                        </div>
                    }
                </div> */}

                <div className="text-center">
                    New to ConPanion? <a href="#" onClick={() => this.props.history.push("/register")} className="link">Sign up now!</a>
                </div>
            </section>
        )
    }
}