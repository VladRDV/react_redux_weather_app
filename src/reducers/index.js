import { combineReducers } from 'redux';
import { weatherData, activePlace } from './red';

export default combineReducers({
    weatherData,
    activePlace
});
