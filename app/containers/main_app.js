import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchName, fetchPerson } from '../actions/index'

import Hello from '../components/hello'


class MainApp extends Component {
    constructor( props ) {
        super( props );

        console.log('props', props);
    }

    componentDidMount() {
        this.props.fetchName();
    }

    componentWillReceiveProps( nextProps ) {
        console.log('receive', nextProps);
    }

    render() {
        return (
            <Hello name={ this.props.name } />
        );
    }
}

function mapStateToProps({ name }) {
    return {
        name
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        fetchName: fetchName
    }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps )( MainApp );