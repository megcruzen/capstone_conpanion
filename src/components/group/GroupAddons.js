import React, { Component } from 'react';
import { Col } from 'reactstrap';
import MemberList from "./MemberList"
import CharacterList from "./CharacterList"

export default class GroupAddons extends Component {
    render() {

        return (
                <Col sm="6">
                    <MemberList myGroup={this.props.myGroup} groupMembers={this.props.groupMembers} {...this.props} />
                    <CharacterList myGroup={this.props.myGroup} characters={this.props.characters} addCharacter={this.props.addCharacter} deleteCharacter={this.props.deleteCharacter} {...this.props} />
                </Col>

        )
    }
}