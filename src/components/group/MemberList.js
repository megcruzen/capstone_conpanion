import React, { Component } from 'react';
// import { Button } from 'reactstrap';
import Collapsible from 'react-collapsible';
import MemberCard from './MemberCard'

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
                                this.props.groupMembers.filter(member => member.groupId === this.props.group.id)
                                .map(member =>
                                    <MemberCard member={member} group={this.props.group} leaveGroup={this.leaveGroup} {...this.props} />
                                )
                            }
                        </ul>
                    </Collapsible>

                </div>

        )
    }
}