import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Col } from 'reactstrap';

export default class GroupCard extends Component {
    render() {

        const group = this.props.myGroup.group;
        // const convention = this.props.allConventions.find(convention => convention.id === group.conventionId) || {}
        // const conName = convention.name;
        // const startDate = new Date(convention.startDate);
        // const startYear = startDate.getFullYear();

        return (
                <Col sm="6">
                    <div className="group_card">
                        <Link to={`/groups/${group.id}/`}>
                            <h5>{group.name}</h5>
                            <hr />
                            <p className="mb-0">{group.description}</p>
                        </Link>
                    </div>
                </Col>

        )
    }
}