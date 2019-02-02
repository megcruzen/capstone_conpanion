import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

export default class CostumeCard extends Component {
    render() {
        return (
            <div key={this.props.costume.id}>
                <div>
                {this.props.costume.name}
                </div>
                {/* <Link className="nav-link" to={`students/${student.id}/edit`}>Edit</Link> */}
            </div>
        )
    }
}