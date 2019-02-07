import React, { Component } from 'react'
import { TabContent, TabPane, Button } from 'reactstrap';
// import classnames from 'classnames';
import "../CosBuddy.css"
import ConSearchName from './ConSearchName';

export default class ConventionSearch extends Component {

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

    render() {
        return (
            <section className="convention_search">
                <h1>Find a Convention</h1>
                <div className="mt-3">
                    {/* <Button color="primary"
                    className={"mr-3 " + classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                    >Search by Name</Button> */}
                    {/* <Button color="primary"
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                    >Search by Date</Button> */}
                </div>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1" className="mt-4">
                        <ConSearchName allConventions={this.props.allConventions} {...this.props} />
                    </TabPane>
                    <TabPane tabId="2" className="mt-4">
                        <h4>Search by Date</h4>
                    </TabPane>
                </TabContent>
            </section>
        )
    }
}