import React, { Component } from 'react';

export default class Hello extends Component {
    static defaultProps = {
        name: 'unknown'
    };

    render() {
        return (
            <div>Hello { this.props.name }!</div>
        );
    }
}