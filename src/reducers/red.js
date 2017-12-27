var citiesArr = [{ name: "Palo Alto", zip: "94303" },
      { name: "San Jose", zip: "94088" },
      { name: "Santa Cruz", zip: "95062" },
      { name: "Honolulu", zip: "96803" },
      { name: "Santa Cruz", zip: "95062" },
      { name: "Honolulu", zip: "96803" },
      { name: "Novi Sad", zip: "21000" },
      { name: "Belgrade", zip: "11000" },
      { name: "Palo Alto", zip: "94303" },
      { name: "San Jose", zip: "94088" },
      { name: "Santa Cruz", zip: "95062"},
      { name: "Honolulu", zip: "96803" },
      { name: "Novi Sad", zip: "21000" },
      { name: "Valjevo", zip: "21000" },
      { name: "Belgrade", zip: "11000" }]

export function weatherData(state = {}, action) {
    switch (action.type) {
        case 'FETCH_DATA_SUCCESS':
            return action.fetchedData;
        default:
            return state;
    }
}

export function activePlace(state = 0, action) {
    switch (action.type) {
        case 'SET_ACTIVE_PLACE':
            return action.placeIndex;
        default:
            return state;
    }
}

export function cities(state = citiesArr, action) {
    switch (action.type) {
        case 'SET_CITIES':
            return action.cities ;

        default:
            return state;
    }
}

