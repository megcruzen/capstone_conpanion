import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Col } from 'reactstrap';

export default class CostumeCard extends Component {

    render() {
        let name = this.props.costume.name;
        name = name.replace(/\s+/g, '-').toLowerCase();

        let outfit = this.props.costume.outfit;
        outfit = outfit.replace(/\s+/g, '-').toLowerCase();

        return (
                <Col sm="3">
                    <Card key={this.props.costume.id} className="mr-2 mb-3">
                    <Link to={`/costumes/${this.props.costume.id}/${name}/${outfit}`}>
                        <CardImg top width="100%" src={this.props.costume.image} alt={this.props.costume.name} />
                        <CardBody>
                            <CardSubtitle className="text-uppercase subtitle">{this.props.costume.series}</CardSubtitle>
                            <CardTitle><h5>{this.props.costume.name}</h5></CardTitle>
                            <CardText className="outfit mt-1"><i class="fas fa-user-circle"></i> {this.props.costume.outfit}</CardText>
                        </CardBody>
                    </Link>
                    </Card>
                </Col>
        )
    }
}