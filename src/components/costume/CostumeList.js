import React, { Component } from 'react'
import CostumeCard from "./CostumeCard"

export default class CostumeList extends Component {
    render() {
        return (
            <section>
                <h1>My Costumes</h1>
                <div className="costume_list_global">
                {
                    this.props.costumes.map(costume =>
                        <CostumeCard key={costume.id} costume={costume} {...this.props} />
                    )
                }
                </div>
            </section>
        )
    }
}