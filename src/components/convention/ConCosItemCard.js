import React, { Component } from 'react';
import "../CosBuddy.css";
export default class ConCosItemCard extends Component {

    updateItem = (itemId) => {

        const existingItem = {
            checked: !this.props.item.checked,
            conCostumeId: this.props.item.conCostumeId,
            costumeItemId: this.props.item.costumeItemId,
        }

        this.props.updateConCostumeItem(this.props.item.id, existingItem)
    }

    itemConditionalStyle = (itemId) => {
        if (this.props.item.checked === false) {
            let style = "unchecked";
            return style;
        }
        else {
            let style = "checked"
            return style;
        }
    }

    render() {

        return (
            <tr>
                <td onClick={(() => this.updateItem(this.props.item.id))}>
                    <div className="d-flex justify-content-between">
                        <div className={this.itemConditionalStyle(this.props.item.id)}>{this.props.item.costumeItem.name}</div>
                        {/* <div>costumeItem.id: {this.props.item.costumeItem.id}</div>
                        <div>conCostumeId: {this.props.conCostumeId}</div> */}
                    </div>
                </td>
            </tr>
        )
    }
}