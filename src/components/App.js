import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData, setActivePlace } from '../actions/act';
import "bootswatch/spacelab/bootstrap.css";
import { Navbar,NavDropdown, MenuItem, Nav, Grid, Row, Col } from "react-bootstrap";
import '../styles/App.css';

function WeatherDisplay(props) {
    const weatherData = props.weaerData;
    if (!weatherData) return <div>Loading...</div>;
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
    componentDidMount() {
        let URL = `http://api.openweathermap.org/data/2.5/weather?q=${this.props.cities[this.props.activePlace].name}&units=metric&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial`;
        this.props.fetchData(URL);
    }

    render() {
       return (
        <div className="App">
            <div>
            <p>{this.props.cities[this.props.activePlace].name}</p>
        <p>{this.props.weather.name}</p>
        <p>{this.props.activePlace}</p> 
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
                              this.props.setActivePlace(index)
                            }}>
                            <NavDropdown eventKey="4" title="Select a city" id="nav-dropdown">
                            {this.props.cities.map((city, index) => (
                              <MenuItem key={index} eventKey={index}>{city.name}</MenuItem>
                            ))}
                            </NavDropdown>
                            
                          </Nav>
                        </Col>
                        <Col md={9} sm={9} lg={9}>
                            <WeatherDisplay key={0} cities={this.props.cities} weatherData={this.props.weather} activePlace={this.props.activePlace} />
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

