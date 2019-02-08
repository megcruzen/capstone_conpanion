import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Media, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalBody, ModalFooter} from 'reactstrap';
import classnames from 'classnames';
import "../CosBuddy.css";
import thumb from "./64x64.jpg"
import ConventionCostumeList from "./ConventionCostumeList";
import ConventionPackingList from './ConventionPackingList';
import CostumePackingList from './CostumePackingList';

export default class ConventionDetails extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this);
        this.state = {
          activeTab: '1',
          modal: false
        };
      }

      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

      toggle2() {
        this.setState({
          modal: !this.state.modal
        });
      }

    render() {
        const convention = this.props.myConventions.find(convention => convention.id === parseInt(this.props.match.params.conventionId)) || {}
        // const conventionName = myConvention.convention ? myConvention.name : ""
        // const conventionDate = myConvention.convention ? myConvention.displayDate : ""
        // console.log("myconvention:", this.props);
        // console.log("convention", convention)
        return (
                <section key={this.props.id} className="mr-2 mb-3 convention_details">
                    <a href="#" onClick={() => this.props.history.push("/conventions/")} className="return">&laquo; Return to conventions</a>
                    <Media className="mt-4 pt-2">
                        <Media left href="#" className="mr-3">
                            <Media object src={thumb} className="thumb" alt="" />
                        </Media>
                        <Media body className="d-flex justify-content-between align-items-center">
                            <div>
                                <h3 className="mb-0">{convention.name}</h3>
                                <span className="text-uppercase subtitle">{convention.displayDate}</span>
                            </div>
                            <div>
                                <i className="fas fa-edit mr-2 text-secondary" onClick={this.toggle2}></i>
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
                    <TabContent activeTab={this.state.activeTab} className="mt-4">
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <ConventionCostumeList key={convention.id} convention={convention} {...this.props} />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="6">
                                    <ConventionPackingList myConventionId={convention.id} {...this.props} />
                                </Col>
                                <Col sm="6">
                                    <CostumePackingList myConventionId={convention.id} {...this.props} />
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                    <Modal isOpen={this.state.modal} toggle={this.toggle2} className={this.props.className}>
                        <ModalBody>
                            Does this convention need a correction? Please contact our administration team.
                        </ModalBody>
                        <ModalFooter>
                            <Link to="/contact"><Button color="primary">Contact Us</Button>{' '}</Link>
                            <Button color="secondary" onClick={this.toggle2}>Cancel</Button>
                        </ModalFooter>
                        </Modal>
                    </div>
                </section>
        )
    }
}