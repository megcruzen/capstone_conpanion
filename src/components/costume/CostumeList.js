import React, { Component } from 'react'
import { Button } from 'reactstrap';
import CostumeCard from "./CostumeCard"

export default class CostumeList extends Component {
    render() {
        return (
            <section className="costume_list">
                <div className="d-sm-flex justify-content-between flex-wrap align-items-center mb-3">
                    <div><h1 className="text-center">My Costumes</h1></div>
                    <div className="text-center"><Button color="primary" onClick={() => this.props.history.push("/costumes/new")}>Add Costume</Button></div>
                </div>
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