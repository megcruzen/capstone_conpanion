import React, { Component } from 'react';
import { Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "../CosBuddy.css";
import GroupAddons from "./GroupAddons"
import GroupChat from "./GroupChat"

export default class GroupDetails extends Component {

    state = {
        modal: false
    }

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }


    render() {

        const myGroup = this.props.myGroups.find(myGroup => myGroup.group.id === parseInt(this.props.match.params.groupId)) || {}
        const group = this.props.allGroups.find(group => group.id === myGroup.groupId) || {}
        // const convention = this.props.allConventions.find(convention => convention.id === group.conventionId) || {}

        // const startDate = new Date(convention.startDate);
        // const startYear = startDate.getFullYear();

        return (
                <section key={group.id} className="mr-2 mb-3 group_details_section">
                    <a href="#" onClick={() => this.props.history.push("/groups/")} className="return">&laquo; Return to groups</a>

                    <div className="d-flex justify-content-between flex-wrap mt-4">
                        <div className="group_details mb-1">
                            <h3>{group.name}</h3>
                            <div>{group.description}</div>
                            {/* <p>{convention.name} {startYear}</p> */}
                        </div>
                        <div className="small">
                            <a href="#" className="link" onClick={this.toggle}>Add Member</a> | <a href="#" className="link">Leave Group</a>
                        </div>
                    </div>

                    <Row className="mt-4">
                        <GroupAddons myGroup={myGroup} characters={this.props.characters} addCharacter={this.props.addCharacter} deleteCharacter={this.props.deleteCharacter} {...this.props} />
                        <GroupChat myGroup={myGroup} messages={this.props.messages} users={this.props.users} {...this.props} />
                    </Row>

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader>
                            Add New Member
                        </ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.addItem} className="d-flex">
                                <FormGroup className="w-100 mr-2">
                                    <Label for="username" hidden>Username</Label>
                                    <Input type="text" required name="username" id="username"
                                    onChange={this.handleFieldChange} placeholder="Enter username" />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Add Member</Button>
                        </ModalFooter>
                    </Modal>

                </section>
        )
    }
}