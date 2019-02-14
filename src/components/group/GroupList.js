import React, { Component } from 'react'
import { Button, Row } from 'reactstrap';
import GroupCard from "./GroupCard"

export default class GroupList extends Component {
    render() {
        return (
            <section className="group_list">
                <div className="d-sm-flex justify-content-between flex-wrap align-items-center mb-3">
                    <div><h1 className="text-center">My Groups</h1></div>
                    <div className="text-center"><Button color="primary" onClick={() => this.props.history.push("/groups/new")}>Add Group</Button></div>
                </div>
                <ul>
                    {
                    this.props.myGroups.map(myGroup =>
                        <GroupCard key={myGroup.id} myGroup={myGroup} {...this.props} />
                    )
                    }
                </ul>
            </section>
        )
    }
}