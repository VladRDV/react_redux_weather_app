import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData, setActivePlace } from '../actions/act';
import "bootswatch/paper/bootstrap.css";
import { Navbar,NavDropdown, MenuItem, Nav, Grid, Row, Col } from "react-bootstrap";
import '../styles/App.css';

class WeatherDisplay extends Component{

    collectData(place){
        let URL = `http://api.openweathermap.org/data/2.5/weather?q=${this.props.cities[place].name}&appid=e03fcde097d74790d2a8569aa4d88bd1&units=metric`;
        this.props.fetchData(URL);
    }


    componentWillReceiveProps(nextProps) {
            if(this.props.activePlace !== nextProps.activePlace){
                this.collectData(nextProps.activePlace);
            } 
    }

    componentDidMount() {
        this.collectData(this.props.activePlace);
    }

    render() {
        let weatherData = this.props.weatherData;
            if(weatherData.weather){
                const weatherMain = weatherData.weather[0]; 
                const iconUrl = `http://openweathermap.org/img/w/${weatherMain.icon}.png`;
                return (
                    <div>
                        <h1>
                            {weatherData.weather[0].main} in {weatherData.name}
                            <img src={iconUrl} alt={weatherData.description} />
                        </h1>                             
                        <p>
                            Current: {weatherData.main.temp}°C
                        </p>
                        <p>
                            High: {weatherData.main.temp_max}°C
                        </p>
                        <p>
                            Low: {weatherData.main.temp_min}°C
                        </p>
                        <p>
                            Wind Speed: {weatherData.wind.speed} m/s
                        </p>
                        <p>
                            Coordinates: ({weatherData.coord.lat}, {weatherData.coord.lon})
                        </p>
                    </div>
                );
            }
        return (
            <div>
                Loading...
            </div>
            );
        
       }  
}

class App extends Component {

    render() {
        return (
        <div
            className="App">
                <div>
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                Weather In Serbia
                            </Navbar.Brand>
                        </Navbar.Header>
                    </Navbar>
                    <Grid>
                        <Row>
                            <Col md={3} sm={3} lg={3} >
                                <Nav
                                    bsStyle="pills"
                                    stacked
                                    activeKey={this.props.activePlace}
                                    onSelect={(index) => {
                                        this.props.setActivePlace(index);
                                    }}>
                                        <NavDropdown
                                            eventKey="4"
                                            title="Select a city"
                                            id="nav-dropdown">
                                            {this.props.cities.map((city, index) => (
                                                <MenuItem key={index} eventKey={index}>{city.name}</MenuItem>
                                            ))}
                                        </NavDropdown>
                                </Nav>
                            </Col>
                            <Col
                                md={9}
                                sm={9}
                                lg={9}>
                                <WeatherDisplay key={0} cities={this.props.cities} weatherData={this.props.weather} activePlace={this.props.activePlace} fetchData={this.props.fetchData}/>
                            </Col>
                        </Row>
                    </Grid>
                </div>
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

