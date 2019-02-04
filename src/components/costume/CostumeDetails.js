import React, { Component } from 'react'
import { Media, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "../CosBuddy.css";
import thumb from "./64x64.jpg"

export default class CostumeDetails extends Component {
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
        const costume = this.props.costumes.find(costume => costume.id === parseInt(this.props.match.params.costumeId)) || {}
        return (
                <section key={costume.id} className="mr-2 mb-3 costume_details">
                    <Media className="pt-2 px-2">
                        <Media left href="#" className="mr-3">
                            <Media object src={thumb} className="thumb" alt="" />
                        </Media>
                        <Media body className="d-flex justify-content-between align-items-center">
                            <div className="costume_details">
                                <span className="text-uppercase series">{costume.series}</span>
                                <h4>{costume.name}</h4>
                                {costume.outfit}
                            </div>
                            <div>
                            <i className="fas fa-edit mr-2 text-secondary"></i>
                            <i className="fas fa-times-circle text-danger" onClick={this.toggle} style={{cursor:'pointer'}}></i>
                            </div>
                        </Media>
                    </Media>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Remove Costume</ModalHeader>
                        <ModalBody>
                            Are you sure you want to remove <strong>{costume.name}</strong> from your list?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.props.deleteCostume(costume.id).then(() => this.props.history.push("/costumes"))}>Yes, Please Remove</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </section>
        )
    }
}