import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureMyStore from './store/configureStore';

import App from './components/App';

export const store = configureMyStore();
console.log(`Store state is: `);
console.dir(store.getState());

store.subscribe(()=>{
	console.log(`Store state has changed: `);
	console.dir(store.getState());
})

// store.dispatch({type:'SET_ACTIVE_PLACE', placeIndex:3})
// store.dispatch({type:'FETCH_DATA_SUCCESS', fetchedData:{name:65165,r:'fdfdfd'}})
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


// var citiesArr = {
//     cities:[{ name: "Palo Alto", zip: "94303" },
//       { name: "San Jose", zip: "94088" },
//       { name: "Santa Cruz", zip: "95062" },
//       { name: "Honolulu", zip: "96803" },
//       { name: "Santa Cruz", zip: "95062" },
//       { name: "Honolulu", zip: "96803" },
//       { name: "Novi Sad", zip: "21000" },
//       { name: "Belgrade", zip: "11000" },
//       { name: "Palo Alto", zip: "94303" },
//       { name: "San Jose", zip: "94088" },
//       { name: "Santa Cruz", zip: "95062"},
//       { name: "Honolulu", zip: "96803" },
//       { name: "Novi Sad", zip: "21000" },
//       { name: "Valjevo", zip: "21000" },
//       { name: "Belgrade", zip: "11000" }]
// }