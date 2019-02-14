import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import { Button, Row } from 'reactstrap';
// import CostumeCard from "./CostumeCard"

export default class GroupCard extends Component {
    render() {

        const group = this.props.myGroup.group;
        const convention = this.props.allConventions.find(convention => convention.id === group.conventionId) || {}
        const conName = convention.name;
        const startDate = new Date(convention.startDate);
        const startYear = startDate.getFullYear();

        return (
                <li>{group.name} {conName} {startYear} (<Link to={`/groups/${group.id}/`}>Details</Link>)</li>

        )
    }
}