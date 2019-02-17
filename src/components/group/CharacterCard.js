import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import AppManager from "../../modules/AppManager"

export default class CharacterCard extends Component {

    state = {
        name: "",
        user: "",
        groupId: "",
        userCheck: false
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    clickToEditUser = () => {
        AppManager.getCharacterById(this.props.character.id)
        .then(character => {
            this.setState({ user: character.user, userCheck: true })
        })
    }

    returnFormOrText = (character) => {
        if (this.state.userCheck) {
            return (
                <td className="user_update">
                    <Form className="user_edit" onSubmit={this.updateUser} onMouseLeave={this.updateUser} autocomplete="off">
                        <FormGroup className="mb-0">
                            <Input type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="user"
                                value={this.state.user} />
                        </FormGroup>
                    </Form>
                </td>
            )
        } else {
            return (
                <td className="user" onClick={this.clickToEditUser}>{this.props.character.user}</td>
            )
        }
    }

    updateUser = evt => {
        evt.preventDefault();

        const character = {
            name: this.props.character.name,
            user: this.state.user,
            groupId: this.props.groupId,
        }

        this.props.updateCharacter(this.props.groupId, character)
        .then(() => { this.setState({ userCheck: false }) })
    }

    render() {

        console.log(this.props.character.id)

        return (
                <tr key={this.props.character.id}>
                    <td className="character">{this.props.character.name}</td>
                    {this.returnFormOrText(this.props.character)}
                    <td className="text-right"><i className="fas fa-times-circle delete" onClick={() => this.props.deleteCharacter(this.props.character.id)} style={{cursor:'pointer'}}></i></td>
                </tr>

        )
    }
}