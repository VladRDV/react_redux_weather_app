import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData, setActivePlace } from '../actions/act';

import "bootswatch/lumen/bootstrap.css";
import { Navbar,NavDropdown, MenuItem, Nav, Grid, Row, Col } from "react-bootstrap";
import '../styles/App.css';


class App extends Component {
    componentDidMount() {
        this.props.fetchData('http://api.openweathermap.org/data/2.5/weather?q=New York&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial');
        this.props.setActivePlace(156);
    }

    render() {
       return (
        <div>
            <p>58585</p>
            <p>{ this.props.weather.name }</p>
            <p>{ this.props.activePlace }</p>
            <p>{ this.props.cities[0].name }</p>
        </div>
        )
    };
};



const mapStateToProps = (state) => {
    return {
        weather: state.weatherData,
        activePlace: state.activePlace,
        cities: state.cities
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

