import React, { Component } from 'react';
import { Col } from 'reactstrap';
import { CollapsibleComponent } from 'react-collapsible-component';
import MemberList from "./MemberList"
import CharacterList from "./CharacterList"

export default class GroupAddons extends Component {
    render() {

        return (
                <Col sm="6">
                    <CollapsibleComponent>
                        <MemberList group={this.props.group} groupMembers={this.props.groupMembers} leaveGroup={this.leaveGroup} {...this.props} />
                        <CharacterList group={this.props.group} characters={this.props.characters} addCharacter={this.props.addCharacter} deleteCharacter={this.props.deleteCharacter} {...this.props} />
                    </CollapsibleComponent>
                </Col>

        )
    }
}