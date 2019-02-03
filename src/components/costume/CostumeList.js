import React, { Component } from 'react'
import CostumeCard from "./CostumeCard"

export default class CostumeList extends Component {
    render() {
        return (
            <section className="costume_list">
                <h1>My Costumes</h1>
                <div className="d-flex justify-content-between flex-wrap">
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