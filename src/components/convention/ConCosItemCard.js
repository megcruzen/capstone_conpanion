import React, { Component } from 'react';

export default class ConCosItemCard extends Component {

    updateItem = (itemId) => {

        const existingItem = {
            checked: !this.props.item.checked,
            name: this.props.item.name,
            userConventionId: this.props.item.userConventionId
        }

        this.props.updateConCostumeItem(itemId, existingItem)
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

        console.log("this.props", this.props.item.costumeItem.name)

        return (
            <tr>
                <td onClick={(() => this.updateItem(this.props.item.id))}>
                    <div className="d-flex justify-content-between">
                        <div className={this.itemConditionalStyle(this.props.item.id)}>{this.props.item.costumeItem.name}</div>
                        <div>
                            <i className="fas fa-times-circle text-danger" onClick={() => this.props.deleteConItem(this.props.item.id)} style={{cursor:'pointer'}}></i>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}