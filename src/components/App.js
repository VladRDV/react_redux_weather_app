import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData, setActivePlace } from '../actions/act';
import "bootswatch/spacelab/bootstrap.css";
import { Navbar,NavDropdown, MenuItem, Nav, Grid, Row, Col } from "react-bootstrap";
import '../styles/App.css';

function WeatherDisplay(props) {
    const weatherData = props.weabftherData;
    if (!weatherData) {

        return (<div>
                    Loading...{props.activePlace}
                    <p>{props.weatherData.name}</p>
                </div>)
    };
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°C</p>
        <p>High: {weatherData.main.temp_max}°C</p>
        <p>Low: {weatherData.main.temp_min}°C</p>
        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      </div>
    );  }

class App extends Component {

    collectData(){
        let URL = `http://api.openweathermap.org/data/2.5/weather?q=${this.props.cities[this.props.activePlace].name}&units=metric&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial`;
        this.props.fetchData(URL);
    }


    componentDidMount() {
        this.collectData();
    }

    render() {
       return (
        <div className="App">
            <div>
            <p>{this.props.cities[this.props.activePlace].name}------ from cities array</p>
            <p>{this.props.weather.name}----- from API JSON</p>
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
                                let a = this.props.activePlace;
                                this.props.setActivePlace(index);
                                    this.collectData();
                            }}>
                            <NavDropdown eventKey="4" title="Select a city" id="nav-dropdown">
                            {this.props.cities.map((city, index) => (
                              <MenuItem key={index} eventKey={index}>{city.name}</MenuItem>
                            ))}
                            </NavDropdown>
                            
                          </Nav>
                        </Col>
                        <Col md={9} sm={9} lg={9}>
                            <WeatherDisplay key={0} cities={this.props.cities} weatherData={this.props.weather} activePlace={this.props.activePlace} updateData={this.collectData}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        </div>
        )
    };
};



const mapStateToProps = (state) => {
    console.log('mapping state to props...');
    console.log(state.activePlace);
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

/*
for some reason collectData receives an old version of redux state and 
as a result of that if we start with ActivePlace of 0
and select 3, and then 4
we will stay with view of ActivePlace = 0, when ti should have been view of ActivePlace = 3
and we will get 3 only, once we select 4(or anything alse actually)

mapDispatchToProps works normally as far as I can see, so the core of the problem is 
collectData method, that receives old state
*/


