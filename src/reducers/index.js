import { combineReducers } from 'redux';
import { cities, weatherData , activePlace } from './red';

export default combineReducers({
    weatherData ,
    cities,
    activePlace
});
