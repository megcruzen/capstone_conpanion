import React, { Component } from 'react';

export default class CostumeItemCard extends Component {
    render() {
        return (
            <tr>
                <td>
                    <div className="d-flex justify-content-between">
                        <div className="item_name">{this.props.item.name}</div>
                        <div>
                            <i className="fas fa-times-circle text-danger" onClick={() => console.log("Delete!")} style={{cursor:'pointer'}}></i>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}