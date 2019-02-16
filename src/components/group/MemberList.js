import React, { Component } from 'react';
import { Button, Collapse } from 'reactstrap';

export default class MemberList extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
      }

      toggle() {
        this.setState({ collapse: !this.state.collapse });
      }

    render() {
        return (
                <div sm="6" className="member_list mb-2">
                    <div>
                        <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>View Member List</Button>
                        <Collapse isOpen={this.state.collapse}>
                            <ul>
                            {
                                this.props.groupMembers.filter(member => member.groupId === this.props.myGroup.id)
                                .map(member =>
                                    <li>{member.user.username}</li>
                                )
                            }
                            </ul>
                        </Collapse>
                    </div>

                </div>

        )
    }
}