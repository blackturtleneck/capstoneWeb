import React, { Component } from 'react';
import Checkbox from './Checkbox';
import Dates from './Dates';

const items = [
    'American',
    'Asian',
    'Bars',
    'French',
    'Fusion',
    'Greek',
    'Italian',
    'Japanese',
    'Korean',
    'Mexican',
    'Sandwich',
    'Steak',
    'Sushi',
    'Tacos',
    'Tapas',
    'Teriyaki',
    'Thai',
    'Vegetarian',
    'Vietnamese'
];

class Cuisines extends Component {
    constructor(props) {
        super(props);
        this.selections = [];
    }
    componentWillMount() {
        this.selectedCheckboxes = new Set();
    }

    toggleCheckbox(label) {
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        } else {
            this.selectedCheckboxes.add(label);
        }
    }

    handleFormSubmit(formSubmitEvent) {
        formSubmitEvent.preventDefault();

        for (const checkbox of this.selectedCheckboxes) {
            console.log(checkbox, 'is selected.');
            this.selections.push(checkbox);
        }
        console.log(this.selections);
    }

    createCheckbox(label) {
        <Checkbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />;
    }

    createCheckboxes() {
        items.map(this.createCheckbox);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <form onSubmit={this.handleFormSubmit}>
                            {this.createCheckboxes()}

                            <button className="btn btn-default" type="submit">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
                <Dates />
            </div>
        );
    }
}

export default Cuisines;
