import React, { Component } from 'react';
import { Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "../CosBuddy.css";
import GroupAddons from "./GroupAddons"
import GroupChat from "./GroupChat"

export default class GroupDetails extends Component {

    state = {
        modal: false,
        modal2: false,
        modal3: false
    }

    toggle = () => {
        this.setState({  modal: !this.state.modal });
    }

    toggle2 = () => {
        this.setState({  modal2: !this.state.modal2 });
    }

    toggle3 = () => {
        this.setState({  modal3: !this.state.modal3 });
    }

    leaveGroup = () => {
        const group = parseInt(this.props.match.params.groupId);
        const user = sessionStorage.getItem("User");
        const userGroupId = this.props.groupMembers.find(member =>
           member.groupId = group && member.userId === Number(user)).id
        this.props.leaveGroup(userGroupId)
        this.props.history.push("/groups/");
    }

    deleteGroup = (id) => {
        this.props.deleteGroup(id);
        this.toggle();
        this.props.history.push("/groups/");
    }

    addMember = (event) => {
        event.preventDefault();
        console.log("Click!")
        this.toggle();
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
                            <a href="#" className="link" onClick={this.toggle}>Add Member</a> | <a href="#" className="link" onClick={this.toggle3}>Leave Group | <a href="#" className="link" onClick={this.toggle2}>Delete Group</a></a>
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
                            <Form className="d-flex">
                                <FormGroup className="w-100 mr-2">
                                    <Label for="username" hidden>Username</Label>
                                    <Input type="text" required name="username" id="username"
                                    onChange={this.handleFieldChange} placeholder="Enter username" />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addMember}>Add Member</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.modal2} toggle={this.toggle2} className={this.props.className}>
                        <ModalHeader toggle={this.toggle2}>
                            Delete Group
                        </ModalHeader>
                        <ModalBody>
                            Are you sure you want to delete this group?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.deleteGroup(group.id)}>Yes, Delete Group</Button>{' '}
                            <Button color="secondary" onClick={this.toggle2}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.modal3} toggle={this.toggle3} className={this.props.className}>
                        <ModalHeader toggle={this.toggle3}>Remove Convention</ModalHeader>
                        <ModalBody>
                            Are you sure you want to leave this group?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.leaveGroup()}>Yes, Remove Me From This Group</Button>{' '}
                            <Button color="secondary" onClick={this.toggle3}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                </section>
        )
    }
}