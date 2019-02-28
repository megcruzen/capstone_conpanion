import React, { Component } from 'react';
import { Table } from 'reactstrap';
// import Collapsible from 'react-collapsible';
import { CollapsibleHead, CollapsibleContent } from 'react-collapsible-component'
import MemberCard from './MemberCard'

export default class MemberList extends Component {

    render() {

        return (
                <div sm="6" className="member_list mb-2">

                        <CollapsibleHead>Member List</CollapsibleHead>
                        <CollapsibleContent>
                            <Table>
                                <tbody>
                                {
                                    this.props.groupMembers.filter(member => member.groupId === this.props.group.id)
                                    .map(member =>
                                        <MemberCard member={member} group={this.props.group} leaveGroup={this.leaveGroup} {...this.props} />
                                    )
                                }
                                </tbody>
                            </Table>
                        </CollapsibleContent>

                </div>

        )
    }
}