import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class MemberCard extends Component {

    state = { modal: false }

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }

    showDelete = () => {
        const currentUser = sessionStorage.getItem("User");
        if (Number(currentUser) === Number(this.props.group.userId)) {
            return <i className="fas fa-times-circle delete" onClick={this.toggle} style={{cursor:'pointer'}}></i>
        }
    }

    removeMember = (userGroupId) => {
        this.props.leaveGroup(userGroupId);
        this.toggle();
    }

    render() {

        return (
                <div sm="6" className="member_card mb-2">

                    <li>
                        {this.props.member.user.username} {this.showDelete()}
                    </li>

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Remove Member</ModalHeader>
                        <ModalBody>
                            Are you sure you want to remove this member from the group?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.removeMember(this.props.member.id)}>Yes, Remove from Group</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                </div>

        )
    }
}