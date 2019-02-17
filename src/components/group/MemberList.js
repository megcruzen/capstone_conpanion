import React, { Component } from 'react';
import { Button, Collapse } from 'reactstrap';
import Collapsible from 'react-collapsible';

export default class MemberList extends Component {

    state = { collapse: false }

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
                <div sm="6" className="member_list mb-2">

                    <Collapsible trigger="Member List">
                        <ul>
                            {
                                this.props.groupMembers.filter(member => member.groupId === this.props.myGroup.id)
                                .map(member =>
                                    <li>{member.user.username}</li>
                                )
                            }
                        </ul>
                    </Collapsible>

                </div>

        )
    }
}