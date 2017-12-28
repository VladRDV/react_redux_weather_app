import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData, setActivePlace } from '../actions/act';
import "bootswatch/spacelab/bootstrap.css";
import { Navbar,NavDropdown, MenuItem, Nav, Grid, Row, Col } from "react-bootstrap";
import '../styles/App.css';

class WeatherDisplay extends Component{

    collectData(place){
        console.log('collecting data')
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
    const weatherData = this.props.weathData;
          if (!weatherData) {
      
              return (<div>
                          Loading...{this.props.activePlace}
                          <p>{this.props.weatherData.name}</p>
                      </div>)
          };
          // const weather = weatherData.weather[0];
          // const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
          return (
            <div>
      
            <p>{this.props.weatherData.name}</p>
              {/*<h1>
                        {weather.main} in {weatherData.name}
                        <img src={iconUrl} alt={weatherData.description} />
                      </h1>
                      <p>Current: {weatherData.main.temp}°C</p>
                      <p>High: {weatherData.main.temp_max}°C</p>
                      <p>Low: {weatherData.main.temp_min}°C</p>
                      <p>Wind Speed: {weatherData.wind.speed} m/s</p>*/}
            </div>
          );}  }

class App extends Component {

    // collectData(){
    //     let URL = `http://api.openweathermap.org/data/2.5/weather?q=${this.props.cities[this.props.activePlace].name}&units=metric&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial`;
    //     this.props.fetchData(URL);
    // }


    // // componentWillUnmount() {
    // //     this.collectData();
    // // }
    // componentDidMount() {
    //     this.collectData();
    // }
    

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
                                this.props.setActivePlace(index);
                            }}>
                            <NavDropdown eventKey="4" title="Select a city" id="nav-dropdown">
                            {this.props.cities.map((city, index) => (
                              <MenuItem key={index} eventKey={index}>{city.name}</MenuItem>
                            ))}
                            </NavDropdown>
                            
                          </Nav>
                        </Col>
                        <Col md={9} sm={9} lg={9}>
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

/*in the end the broblem is that props do notget their update from state on time, I need to find a way to call collectData AFTER mapStateToProps fires!!!, mabye i should throw 
collectData to props as well via mapDisatchToProps or something, cuz right now it is working outside the whole redux thing*/
