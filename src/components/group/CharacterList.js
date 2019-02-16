import React, { Component } from 'react';
import { Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class CharacterList extends Component {

    state = {
        name: "",
        user: "",
        groupId: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        // console.log(evt.target.id, evt.target.value);
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    addCharacter = event => {
        event.preventDefault();
        event.target.reset();

        const newCharacter = {
            name: this.state.character,
            user: "",
            groupId: Number(this.props.myGroup.id)
        }

        this.props.addCharacter(newCharacter);
    }

    deleteCharacter = (id) => {
        this.props.deleteCharacter(id);
    }

    render() {

        return (
                <div className="character_list mb-2">
                    <h5>Character List</h5>
                    <Table>
                        <tbody>
                        {
                            this.props.characters.filter(character => character.groupId === this.props.myGroup.id)
                            .map(character =>
                                <tr>
                                    <td>{character.name}</td>
                                    <td>{character.user}</td>
                                    <td><i className="fas fa-times-circle delete" onClick={() => this.deleteCharacter(character.id)} style={{cursor:'pointer'}}></i></td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                    <Form onSubmit={this.addCharacter} className="d-flex">
                        <FormGroup className="w-100 mr-2">
                            <Label for="character" hidden>Character Name</Label>
                            <Input type="text" required name="character" id="character"
                            onChange={this.handleFieldChange} placeholder="Add character" />
                        </FormGroup>
                        <div><Button color="primary">Add</Button></div>
                    </Form>
                </div>

        )
    }
}