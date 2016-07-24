import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk'

import { selector } from './config/constants';
import rootReducer from './reducers';

import MainApp from './containers/main_app';

import { remoteData } from './models/index';

const store = createStore(
    rootReducer,
    applyMiddleware(
        promiseMiddleware,
        thunkMiddleware.withExtraArgument({ remoteData })
    )
);

ReactDOM.render(
    <Provider store={ store }>
        <MainApp />
    </Provider>,
    document.querySelector( selector.DEFAULT_CONTAINER )
);





