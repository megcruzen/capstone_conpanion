import React, { Component } from 'react';

export default class ConItemCard extends Component {
    render() {
        console.log("item id", this.props.item.id)
        return (
            <tr>
                <td>
                    <div className="d-flex justify-content-between">
                        <div className="item_name">{this.props.item.name}</div>
                        <div>
                            <i className="fas fa-times-circle text-danger" onClick={() => this.props.deleteConItem(this.props.item.id)} style={{cursor:'pointer'}}></i>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}