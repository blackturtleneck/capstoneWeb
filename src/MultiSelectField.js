import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Dates from './Dates';

const cuisines = [
    { label: 'American', value: '1' },
    { label: 'Asian', value: '2' },
    { label: 'Bars', value: '3' },
    { label: 'French', value: '4' },
    { label: 'Fusion', value: '5' },
    { label: 'Greek', value: '6' },
    { label: 'Italian', value: '7' },
    { label: 'Japanese', value: '8' },
    { label: 'Korean', value: '9' },
    { label: 'Mexican', value: '10' },
    { label: 'Sandwich', value: '11' },
    { label: 'Steak', value: '12' },
    { label: 'Sushi', value: '13' },
    { label: 'Tacos', value: '14' },
    { label: 'Tapas', value: '15' },
    { label: 'Teriyaki', value: '16' },
    { label: 'Thai', value: '17' },
    { label: 'Vegetarian', value: '18' },
    { label: 'Vietnamese', value: '19' }
];

export default class MultiSelectField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crazy: false,
            value: []
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange(value) {
        console.log('You have selected: ', value);
        this.setState({ value });
    }

    static propTypes = {
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.object
        ])
    };

    triggerChildAlert() {
        this.refs.child.showAlert();
    }

    render() {
        return (
            <div className="section">
                <h3 className="section-heading header">{this.props.label}</h3>
                <button className="button" onClick={this.triggerChildAlert}>
                    Click
                </button>
                <Select
                    multi
                    joinValues
                    value={this.state.value}
                    placeholder="Select the cuisine(s) you like"
                    options={cuisines}
                    onChange={this.handleSelectChange}
                />
                <br />
                <br />
                <Dates ref="child" />
                <button className="button" onClick={this.triggerChildAlert}>
                    Click
                </button>
            </div>
        );
    }
}
