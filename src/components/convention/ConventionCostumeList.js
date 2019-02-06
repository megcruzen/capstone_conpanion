import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ConCostumeCard from "./ConCostumeCard"
import AppManager from '../../modules/AppManager';

export default class ConventionCostumeList extends Component {

    // Set initial state
    state = {
        conCostumes: []
      }

    componentDidMount() {
        AppManager.getCostumesForCon(this.props.myConventionId)
        .then(conCostumes => {
            this.setState({ conCostumes: conCostumes })
        })
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        // console.log(evt.target.id, evt.target.value);
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    connectionCheck = () => {
        let costumeArray = this.props.costumes;
        let conCostumeArray = this.state.conCostumes;
        // let conCostumeArray = this.state.conCostumes.map(conCostume => conCostume);

        console.log("costumeIdArray", costumeArray, "conCostumeIdArray:", conCostumeArray);

        // let results = costumeArray.find(costume =>
        //     costume.id === conCostumeArray.map(conCostume => conCostume.costumeId)
        //     )
        // console.log("results", results)
        // if (results === undefined) {
        //     console.log("No results found.")
        // }

        // costumeArray.find(costume =>
        //     costume.id === conCostumeArray.map(conCostume => conCostume.costumeId)
        //     )
        //     // .map(costume =>
        //     //     console.log(costume.name))

        // let results = costumeArray.find(costume =>
        //     costume.id === 1)
        //     console.log("results", results)

        // if (costumeArray.map(costume => costume).id === conCostumeArray.map(conCostume => conCostume.conCostumeId).id) {
        //     console.log("It's a match!")
        // }

    }


    // Create the conCostume object
    constructConnection = event => {
        event.preventDefault();     // Cancels the default action of the submit.
        const conCostume = {
            costumeId: Number(this.state.costumeId),
            userConventionId: this.props.myConventionId
        }

        // POST the conCostume object
        this.props.addCostumeToCon(conCostume)
    }

    render() {
        // console.log("this.props.myConventionId:", this.props.myConventionId);
        // console.log("this.props.conCostumes:", this.props.conCostumes)

        return (
            <section className="convention_costume_list">
                <div className="d-sm-flex justify-content-between flex-wrap align-items-center mb-3 mt-4">
                    <h4 className="text-center">Costume List</h4>
                </div>
                <div className="costume_selector d-flex flex-wrap align-items-end">
                    <Form onSubmit={this.constructConnection} className="d-flex w-75 mr-2 align-items-end">
                        <FormGroup className="w-100 mr-2 mb-0">
                            <Label for="costumeId">Add a costume:</Label>
                            <Input type="select" required name="costumeId" id="costumeId"
                            onChange={this.handleFieldChange}>
                            <option value="" selected disabled hidden>Select a costume</option>
                                {/* {
                                    // this.props.costumes
                                    // .filter(costume => costume.id === this.props.conCostume.userConventionId)
                                    this.props.costumes
                                    .map(costume => <option key={costume.id} id={costume.id} value={costume.id}>{costume.name} ({costume.outfit})</option>)
                                } */}
                                {this.connectionCheck()}
                            </Input>
                        </FormGroup>
                        <div><Button color="primary" onClick={this.constructConnection}>Add</Button></div>
                    </Form>
                    <div>
                        <Button color="primary" onClick={() => this.props.history.push("/costumes/new")}>Create New Costume</Button>
                    </div>
                </div>
                <div>

                </div>
                <div className="d-flex justify-content-between flex-wrap mt-4">
                {
                    // get all conCostume objects
                    this.props.conCostumes
                    // only show those objects where this.props.myConventionId (current convention) = conCostume.userConId
                    .filter(conCostume => this.props.myConventionId === conCostume.userConventionId)
                    .map(conCostume =>
                        <ConCostumeCard key={conCostume.id} conCostume={conCostume} {...this.props} />
                    )
                }
                </div>
            </section>
        )
    }
}