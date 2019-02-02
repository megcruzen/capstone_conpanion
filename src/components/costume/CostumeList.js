import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

export default class CostumeList extends Component {
    render() {
        return (
            <section>
                <h1>My Costumes</h1>
                <div className="costume_list_global">
                {
                    this.props.costumes.map(costume =>
                        <div key={costume.id}>
                            <div>
                            {costume.name}
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