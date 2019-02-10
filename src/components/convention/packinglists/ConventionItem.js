import React, { Component } from 'react';

export default class ConventionItem extends Component {


    // // Update state whenever an item is clicked
    // checkOffItem = (itemId) => {
    //     if (this.state.checked === false) {
    //         this.setState({
    //           checked: true
    //         });
    //       }
    //     else {
    //         this.setState({
    //             checked: false
    //         });
    //     }
    // }

    updateItem = (itemId) => {

        const existingItem = {
            checked: !this.props.item.checked,
            name: this.props.item.name,
            userConventionId: this.props.item.userConventionId
        }

        this.props.updateItem(itemId, existingItem)
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
                        <div className={this.itemConditionalStyle(this.props.item.id)}>{this.props.item.name}</div>
                        <div>
                            <i className="fas fa-times-circle text-danger" onClick={() => this.props.deleteConItem(this.props.item.id)} style={{cursor:'pointer'}}></i>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}