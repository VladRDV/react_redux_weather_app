import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureMyStore from './store/configureStore';

import App from './components/App';



let dir = {
	cities:[{ name: "Palo Alto", zip: "94303" },
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
	  { name: "Belgrade", zip: "11000" }],
	activePlace: 0,
	weatherData: {}
}

const store = configureMyStore();
console.log(`Store state is: `);
console.dir(store.getState());

store.subscribe(()=>{
	console.log(`Store state has changed: `);
	console.dir(store.getState());
})

store.dispatch({type:'ITEMS_FETCH_DATA_SUCCESS', weatherData:{"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}],"base":"stations","main":{"temp":280.32,"pressure":1012,"humidity":81,"temp_min":279.15,"temp_max":281.15},"visibility":10000,"wind":{"speed":4.1,"deg":80},"clouds":{"all":90},"dt":1485789600,"sys":{"type":1,"id":5091,"message":0.0103,"country":"GB","sunrise":1485762037,"sunset":1485794875},"id":2643743,"name":"London","cod":200}})
store.dispatch({type:'SET_ACTIVE_PLACE', placeIndex:3})
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
