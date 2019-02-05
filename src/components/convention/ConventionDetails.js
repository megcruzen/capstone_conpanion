import React, { Component } from 'react';
import { Media, Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, } from 'reactstrap';
import classnames from 'classnames';
import "../CosBuddy.css";
import thumb from "./64x64.jpg"
import ConventionCostumeList from "./ConventionCostumeList"

export default class ConventionDetails extends Component {

    // Set initial state
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1'
        };
      }

      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        console.log(evt.target.id, evt.target.value);
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    render() {

        const myConvention = this.props.myConventions.find(convention => convention.id === parseInt(this.props.match.params.conventionId)) || {}
        const conventionName = myConvention.convention ? myConvention.convention.name : ""
        const conventionDate = myConvention.convention ? myConvention.convention.displayDate : ""
        // console.log(myConvention);
        return (
                <section key={myConvention.id} className="mr-2 mb-3 convention_details">
                    <a href="#" onClick={() => this.props.history.push("/conventions/")} className="return">&laquo; Return to conventions</a>
                    <Media className="mt-4 pt-2">
                        <Media left href="#" className="mr-3">
                            <Media object src={thumb} className="thumb" alt="" />
                        </Media>
                        <Media body className="d-flex justify-content-between align-items-center">
                            <div>
                                <h3 className="mb-0">{conventionName}</h3>
                                <span className="text-uppercase subtitle">{conventionDate}</span>
                            </div>
                        </Media>
                    </Media>
                    <div className="tabs mt-4">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}>Costumes</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}>Packing Lists</NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <ConventionCostumeList key={myConvention.id} conCostumes={this.props.conCostumes} {...this.props} />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="6">
                                    <div>General Packing List</div>
                                </Col>
                                <Col sm="6">
                                    <div>Costume Packing lists</div>
                                </Col>
                            </Row>
                        </TabPane>
                        </TabContent>
                    </div>
                </section>
        )
    }
}