// Component that creates each convention card.

import React, { Component } from 'react'
import { Button, Media } from 'reactstrap'
import "../CosBuddy.css"
import thumb from "./64x64.jpg"

export default class ConventionCard extends Component {
    render() {
        return (
            <tr>
                <td>
                    <Media key={this.props.myConvention.id} className="pt-2 px-2">
                        <Media left href="#" className="mr-3">
                            <Media object src={thumb} className="thumb" alt="" />
                        </Media>
                        <Media body className="d-flex justify-content-between align-items-center">
                            <div className="con_details">
                                <h4>{this.props.myConvention.convention.name}</h4>
                                {this.props.myConvention.convention.startDate} - {this.props.myConvention.convention.endDate}
                                <br />
                                {this.props.myConvention.convention.city}, {this.props.myConvention.convention.state}
                            </div>
                            <div>
                                <i className="fas fa-times-circle text-danger" onClick={() => console.log("Delete!")}></i>
                            </div>
                        </Media>
                    </Media>
                </td>
            </tr>
        )
    }
}