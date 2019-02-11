import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ConCostumeCard from "./ConCostumeCard"
// import AppManager from '../../modules/AppManager';

export default class ConventionCostumeList extends Component {

    // Set initial state
    state = {
        costumes: [],
        conCostumes: [],
        filteredCostumes: [],
        costumeId: ""
      }

    // componentDidMount() {
    //     AppManager.getCostumesForCon(this.props.convention.userConventionId)
    //     .then(conCostumes => {
    //         this.setState({ conCostumes: conCostumes })
    //     })
    // }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        console.log(evt.target.id, evt.target.value);
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    displayOptions = () => {

        // if an id in array1 matches an id in array2
        // then remove it
        // and then map through remaining items

        let costumeArray = this.props.costumes.map(costume => costume.id);
        let conCostumeArray = this.props.currentCostumes.map(conCostume => conCostume.costumeId);

        // console.log("costumeIdArray", costumeArray, "conCostumeIdArray:", conCostumeArray);

        // costumeArray = costumeArray.filter(val => !conCostumeArray.includes(val));
        // console.log("filteredArray", costumeArray)

        costumeArray = this.props.costumes.filter(val => !conCostumeArray.includes(val.id));
        // console.log("filteredArray", costumeArray)

        return costumeArray.map(costume => <option key={costume.id} id={costume.id} value={costume.id}>{costume.name} ({costume.outfit})</option>)

    }


    // Create the conCostume object
    constructConnection = event => {
        event.preventDefault();     // Cancels the default action of the submit.
        event.target.reset();       // Resets select after submit.

        if (this.state.costumeId === "") {      // if costume select is empty, alert to select costume
            window.alert("Please select a costume.")
        }
        else {
            const conCostume = {
                costumeId: Number(this.state.costumeId),
                userConventionId: this.props.convention.userConventionId
            }

            // POST the conCostume object
            this.props.addCostumeToCon(conCostume)
        }
    }

    render() {

        return (
            <section className="convention_costume_list">
                <div className="d-sm-flex justify-content-between flex-wrap align-items-center">
                    <h4>Costume List</h4>
                </div>
                <div className="costume_selector d-flex flex-wrap align-items-end">
                    <Form onSubmit={this.constructConnection} className="d-flex w-75 mr-2 align-items-end">
                        <FormGroup className="w-100 mr-2 mb-0">
                            <Label for="costumeId" hidden>Add a costume:</Label>
                            <Input type="select" required name="costumeId" id="costumeId"
                            onChange={this.handleFieldChange}>
                            <option value="" id="" selected>Select a costume</option>
                                {this.displayOptions()}
                            </Input>
                        </FormGroup>
                        <div><Button color="primary">Add</Button></div>
                    </Form>
                    <div>
                        <Button color="primary" onClick={() => this.props.history.push("/costumes/new")}>Create New Costume</Button>
                    </div>
                </div>
                <div className="d-flex justify-content-between flex-wrap mt-4">
                {
                    // get all conCostume objects
                    this.props.conCostumes
                    // only show those objects where this.props.myConventionId (current convention) = conCostume.userConId
                    .filter(conCostume => this.props.convention.userConventionId === conCostume.userConventionId)
                    .map(conCostume =>
                        <ConCostumeCard key={conCostume.id} conCostume={conCostume} {...this.props} />
                    )
                }
                </div>
            </section>
        )
    }
}