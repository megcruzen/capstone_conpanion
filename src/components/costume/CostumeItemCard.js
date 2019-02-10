import React, { Component } from 'react';

export default class CostumeItemCard extends Component {

    deleteCostumeItemAndConItem = (itemId) => {

        let conCostumeItems = this.props.conCostumeItems;
        console.log("itemId", itemId)

        let filteredItems = conCostumeItems.filter(conItem => conItem.costumeItemId === itemId)
        console.log("filteredItems", filteredItems)
        filteredItems.map(item => {
            this.props.deleteConCostumeItem(item.id)
        })

        // this.props.deleteCostumeItem(itemId);
        // this.props.deleteConCostumeItem(conCostumeItemId);
    }

    render() {
        return (
            <tr>
                <td>
                    <div className="d-flex justify-content-between">
                        <div className="item_name">{this.props.item.name}</div>
                        <div>
                            <i className="fas fa-times-circle text-danger" onClick={() => this.deleteCostumeItemAndConItem(this.props.item.id)} style={{cursor:'pointer'}}></i>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}