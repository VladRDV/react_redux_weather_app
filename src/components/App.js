import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData, setActivePlace } from '../actions/act';

import "bootswatch/lumen/bootstrap.css";
import { Navbar,NavDropdown, MenuItem, Nav, Grid, Row, Col } from "react-bootstrap";
import '../styles/App.css';


class App extends Component {
    componentDidMount() {
        console.log('App component has mounted');
    }

    render() {
       return (
        <div>
            <p>58585</p>
            <p>{this.props.weather.name}</p>
        </div>
        )
    };
};



const mapStateToProps = (state) => {
    return {
        weather: state.weatherData,
        activePlace: state.activePlace
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(fetchData(url)),
        setActivePlace: (index) => dispatch(setActivePlace(index))
    };
};

export default connect(
mapStateToProps,
mapDispatchToProps)(App);

