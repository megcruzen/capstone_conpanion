import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ConCostumeCard extends Component {
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

        // const conCostume = this.props.conCostumes.find(conCostume => conCostume.userConventionId === parseInt(this.props.myConventionId)) || {}
        // const costumeName = conCostume.costume ? conCostume.costume.name : ""
        // const costumeSeries = conCostume.costume ? conCostume.costume.series : ""

        return (
            <div className="con_costume_card">
                <Card key={this.props.costume.id} className="mr-2 mb-3">
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody className="d-flex justify-content-between">
                        <div>
                            <CardSubtitle className="text-uppercase subtitle mt-1">{this.props.costume.series}</CardSubtitle>
                            <CardTitle><h3>{this.props.costume.name}</h3></CardTitle>
                            <CardText className="outfit mt-1"><i class="fas fa-user-circle"></i> {this.props.costume.outfit}</CardText>
                        </div>
                        <div>
                            <i className="fas fa-times-circle text-danger" onClick={this.toggle} style={{cursor:'pointer'}}></i>
                        </div>
                    </CardBody>
                </Card>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Remove Convention</ModalHeader>
                    <ModalBody>
                        Are you sure you want to remove <strong>{this.props.costume.name}</strong> from this convention?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.deleteConCostume(this.props.conCostume.id)}>Yes, Please Remove</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}