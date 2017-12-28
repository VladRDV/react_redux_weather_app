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

var citiesArr = [
        { name: "Novi Sad", zip: "21000" },
        { name: "Belgrade", zip: "11000" },
        { name: "Valjevo", zip: "21000" },
        { name: "Nis", zip: "18000" },
        { name: "Kragujevac", zip: "21000" },
        { name: "Leskovac", zip: "16000" },
        { name: "Pancevo", zip: "26000" },
        { name: "Zrenjanin", zip: "23000" },
        { name: "Sabac", zip: "15000" },
        { name: "Cacak", zip: "32000" },
        { name: "Smederevo", zip: "11300" },
        { name: "Novi Pazar", zip: "36300" },
        { name: "Sombor", zip: "25000" },
        { name: "Jagodina", zip: "35000" },
        { name: "Zajecar", zip: "19000" }

        ]
