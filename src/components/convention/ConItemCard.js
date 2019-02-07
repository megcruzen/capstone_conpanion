import React, { Component } from 'react';

export default class ConItemCard extends Component {

    state = {
        checked: this.props.item.checked
    }

    // Update state whenever an item is clicked
    checkOffItem = evt => {
        if (this.state.checked === false) {
            this.setState({
              checked: true
            });
          }
        else {
            this.setState({
                checked: false
            });
        }
    }

    itemConditionalStyle = (itemId) => {
        if (this.state.checked === false) {
            let style = "unchecked";
            return style;
        }
        else {
            let style = "checked"
            return style;
        }
    }

    render() {
        console.log(this.state.checked)
        return (
            <tr>
                <td onClick={this.checkOffItem}>
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