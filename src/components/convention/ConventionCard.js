// Component that creates each convention card.

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Media, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "../CosBuddy.css"
import thumb from "./64x64.jpg"

export default class ConventionCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {

        let str = this.props.convention.name;
        str = str.replace(/\s+/g, '-').toLowerCase();

        return (
            <tr>
                <td>
                    <Media className="pt-2 px-2">
                        <Media left href="#" className="mr-3">
                            <Link to={`/conventions/${this.props.convention.id}/${str}`}>
                                <Media object src={thumb} className="thumb" alt="" />
                            </Link>
                        </Media>
                        <Media body className="d-flex justify-content-between align-items-center">
                            <div className="con_details">
                                <Link to={`/conventions/${this.props.convention.id}/${this.props.convention.name}`}>
                                <h4>{this.props.convention.name}</h4>
                                {this.props.convention.startDate} - {this.props.convention.endDate}
                                <br />
                                {this.props.convention.city}, {this.props.convention.state}
                                {/* userConventionId: {this.props.convention.userConventionId} */}
                                </Link>
                            </div>
                            <div>
                                <i className="fas fa-times-circle text-danger" onClick={this.toggle} style={{cursor:'pointer'}}></i>
                            </div>
                        </Media>
                    </Media>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Remove Convention</ModalHeader>
                        <ModalBody>
                            Are you sure you want to remove <strong>{this.props.convention.name}</strong> from your list?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.props.removeConvention(this.props.convention.userConventionId)}>Yes, Please Remove</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </td>
            </tr>
        )
    }
}