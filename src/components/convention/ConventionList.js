import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

export default class ConventionList extends Component {
    render() {
        return (
            <section>
                <h1>My Conventions</h1>
                <div className="convention_list_personal">
                {
                    this.props.myConventions.map(con =>
                        <div key={con.convention.id}>
                            <div>
                            {con.convention.name}
                            <br />
                            {con.convention.city}, {con.convention.state}
                            </div>
                            {/* <Link className="nav-link" to={`students/${student.id}/edit`}>Edit</Link> */}
                        </div>
                    )
                }
                </div>
            </section>
        )
    }
}