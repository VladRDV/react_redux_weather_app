import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureMyStore from './store/configureStore';

import App from './components/App';

export const store = configureMyStore();
// store.subscribe(()=>{
// 	console.log(`Store state has changed: `);
// 	console.dir(store.getState());
// });
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
