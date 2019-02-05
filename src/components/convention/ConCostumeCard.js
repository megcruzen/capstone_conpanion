import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

export default class ConCostumeCard extends Component {
    render() {
        return (
                <Card key="key" className="mr-2 mb-3">
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody className="d-flex justify-content-between">
                        <div>
                            <CardSubtitle className="text-uppercase subtitle">{this.props.conCostume.costume.series}</CardSubtitle>
                            <CardTitle><h3>{this.props.conCostume.costume.name}</h3></CardTitle>
                            <CardText className="outfit mt-1"><i class="fas fa-user-circle"></i> {this.props.conCostume.costume.outfit}</CardText>
                        </div>
                        <div>
                            <i className="fas fa-times-circle text-danger" onClick={(() => console.log("Delete!"))} style={{cursor:'pointer'}}></i>
                        </div>
                    </CardBody>
                </Card>
        )
    }
}