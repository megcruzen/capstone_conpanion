import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Media, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalBody, ModalFooter} from 'reactstrap';
import classnames from 'classnames';
import "../CosBuddy.css";
import ConventionCostumeList from "./ConventionCostumeList";
import ConventionPackingList from './packinglists/ConventionPackingList';
import CostumeListSection from './packinglists/CostumeListSection';
import Lineup from './Lineup';
// import ConventionToDoList from './ToDoList'

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
            this.setState({ activeTab: tab })}
    }

    toggle2() {
        this.setState({ modal: !this.state.modal });
    }

    print = () => {
        window.print()
    }

    render() {

        const convention = this.props.myConventions.find(convention => convention.id === parseInt(this.props.match.params.conventionId)) || {}
        const currentCostumes = this.props.conCostumes.filter(conCostume => conCostume.userConventionId === convention.userConventionId) || {}

        let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "12"]

        let start = new Date(convention.startDate);
        let startMonth = start.getMonth();
        let startDate = start.getUTCDate();
        // let startYear = start.getFullYear();

        let end = new Date(convention.endDate);
        let endMonth = end.getMonth();
        let endDate = end.getUTCDate();
        let endYear = end.getFullYear();

        let dateDisplay = months[startMonth] + " " + startDate + " - " + months[endMonth] + " " + endDate + ", " + endYear;

        // let conYear = new Date(convention.startDate);
        // conYear = conYear.getFullYear();

        // const getUserCon = this.props.userConventions.find(userConvention => userConvention.id === convention.userConventionId);

        return (
                <section className="mr-2 mb-3 convention_details">
                    <a href="#" onClick={() => this.props.history.push("/conventions/")} className="return d-print-none">&laquo; Return to conventions</a>
                    <Media className="mt-4 pt-2">
                        <Media left href="#" className="mr-3 d-print-none">
                            <Media object src={convention.thumbnail} className="thumb" alt="" />
                        </Media>
                        <Media body className="d-flex justify-content-between align-items-center">
                            <div>
                                <h3 className="mb-0">{convention.name}</h3>
                                <span className="text-uppercase subtitle d-print-none">{dateDisplay}</span>
                            </div>
                            <div>
                                <i className="fas fa-edit mr-2 text-secondary d-print-none" onClick={this.toggle2}></i>
                            </div>
                        </Media>
                    </Media>
                    <div className="tabs mt-4">
                    <Nav tabs className="d-print-none">
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}>Costumes</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}>Lineup</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}>Packing Lists</NavLink>
                        </NavItem>
                        {/* <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '4' })}
                            onClick={() => { this.toggle('4'); }}>To-Do List</NavLink>
                        </NavItem> */}
                    </Nav>
                    <TabContent activeTab={this.state.activeTab} className="mt-4">
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <ConventionCostumeList key={convention.id} convention={convention} currentCostumes={currentCostumes} addCostume={this.props.addCostume} {...this.props} />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="3">
                            <Lineup convention={convention} lineupDays={this.props.lineupDays} timeslots={this.props.timeslots} {...this.props} />
                        </TabPane>
                        <TabPane tabId="2">
                            <div className="d-flex justify-content-between mb-4">
                                <div><h4 className="mb-0 d-print-none">Convention Packing Lists</h4></div>
                                <div onClick={this.print} className="mt-1 mr-2 text-secondary d-print-none"><i class="fas fa-print"></i></div>
                            </div>
                            <Row>
                                <Col sm="3">
                                    <ConventionPackingList convention={convention} {...this.props} />
                                </Col>
                                <CostumeListSection convention={convention} currentCostumes={currentCostumes} {...this.props} />
                            </Row>
                        </TabPane>
                        {/* <TabPane tabId="4">
                            <ConventionToDoList convention={convention} getUserCon={getUserCon} userConventions={this.props.userConventions} {...this.props} />
                        </TabPane> */}
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