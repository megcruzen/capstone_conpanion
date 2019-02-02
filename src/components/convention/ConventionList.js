import React, { Component } from 'react'
import ConventionCard from "./ConventionCard"

export default class ConventionList extends Component {
    render() {
        return (
            <section>
                <h1>My Conventions</h1>
                <div className="convention_list_personal">
                {
                    this.props.myConventions.map(myConvention =>
                        <ConventionCard key={myConvention.id} myConvention={myConvention} {...this.props} />
                    )
                }
                </div>
            </section>
        )
    }
}