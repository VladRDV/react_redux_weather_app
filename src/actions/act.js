export function fetchDataSuccess(weatherData) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        weatherData
    };
}

export function setActivePlace(placeIndex) {
    return {
        type: 'SET_ACTIVE_PLACE',
        placeIndex
    };
}

export function fetchData(url) {
    return (dispatch) => {
        console.log('FETCHING DATA')
    };
}
