import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

export default class CostumeCard extends Component {
    render() {
        return (
                <Card key={this.props.costume.id} className="mr-2 mb-3">
                <Link to={`/costumes/${this.props.costume.id}`}>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody>
                        <CardSubtitle className="text-uppercase series">{this.props.costume.series}</CardSubtitle>
                        <CardTitle><h3>{this.props.costume.name}</h3></CardTitle>
                        <CardText className="outfit mt-1"><i class="fas fa-user-circle"></i> {this.props.costume.outfit}</CardText>
                    </CardBody>
                </Link>
                </Card>
        )
    }
}