// Component that creates each convention card.

import React, { Component } from 'react'

export default class ConventionCard extends Component {
    render() {
        return (
            <div key={this.props.myConvention.id}>
                <div>
                {this.props.myConvention.convention.name}
                <br />
                {this.props.myConvention.convention.city}, {this.props.myConvention.convention.state}
                </div>
                {/* <Link className="nav-link" to={`students/${student.id}/edit`}>Edit</Link> */}
            </div>
        )
    }
}