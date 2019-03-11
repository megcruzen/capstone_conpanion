// Component that creates each convention card.

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Media, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "../Conpanion.css"
// import thumb from "./64x64.jpg"

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

    getImageUrl = (convention) => {
        if (this.props.convention.thumbnail === "") {
            return "https://i.imgur.com/5QVJ5at.png"
        }
        else {
            return this.props.convention.thumbnail
        }
    }

    render() {

        let str = this.props.convention.name;
        str = str.replace(/\s+/g, '-').toLowerCase();

        let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "12"]

        let start = new Date(this.props.convention.startDate);
        let startMonth = start.getMonth();
        let startDate = start.getUTCDate();
        // let startYear = start.getFullYear();

        let end = new Date(this.props.convention.endDate);
        let endMonth = end.getMonth();
        let endDate = end.getUTCDate();
        let endYear = end.getFullYear();

        let dateDisplay = months[startMonth] + " " + startDate + " - " + months[endMonth] + " " + endDate + ", " + endYear;

        // let conYear = new Date(this.props.convention.startDate);
        // conYear = conYear.getFullYear();

        return (
            <tr>
                <td>
                    <Media className="p-2">
                        <Media left href="#" className="mr-3">
                            <Link to={`/conventions/${this.props.convention.id}/${str}`}>
                                <Media object src={this.getImageUrl(this.props.convention)} className="thumb" alt={this.props.convention.name} />
                            </Link>
                        </Media>
                        <Media body className="d-flex justify-content-between align-items-center">
                            <div className="con_details">
                                <Link to={`/conventions/${this.props.convention.id}/${str}`}>
                                <h4 className="mb-0">{this.props.convention.name}</h4>
                                {dateDisplay}
                                <br />
                                {this.props.convention.city}, {this.props.convention.state}
                                </Link>
                            </div>
                            <div>
                                <i className="fas fa-times-circle delete" onClick={this.toggle} style={{cursor:'pointer'}}></i>
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