import React, { Component } from 'react';
import { Table, Row, Col, Media, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import "../CosBuddy.css";
import CharacterList from "./CharacterList"
import GroupChat from "./GroupChat"

export default class GroupDetails extends Component {

    render() {

        const myGroup = this.props.myGroups.find(myGroup => myGroup.group.id === parseInt(this.props.match.params.groupId)) || {}
        const group = this.props.allGroups.find(group => group.id === myGroup.groupId) || {}
        const convention = this.props.allConventions.find(convention => convention.id === group.conventionId) || {}

        const startDate = new Date(convention.startDate);
        const startYear = startDate.getFullYear();

        return (
                <section key={group.id} className="mr-2 mb-3 group_details_section">
                    <a href="#" onClick={() => this.props.history.push("/groups/")} className="return">&laquo; Return to groups</a>

                    <div className="group_details">
                        <h3>{group.name} {group.id}</h3>
                        <p>{convention.name} {startYear}</p>
                    </div>

                    <Row>
                        <CharacterList />
                        <GroupChat myGroup={myGroup} messages={this.props.messages} users={this.props.users} {...this.props} />
                    </Row>

                </section>
        )
    }
}