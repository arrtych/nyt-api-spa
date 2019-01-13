import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage'
import rootReducer from './reducers/rootReducer';

const loadState = {
    query: {
        query: ''
    },
    theme: {
        theme: 'light'
    },
    language: {
        language: 'en'
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState = loadState) {
    return createStore(
        rootReducer,
        loadState,
        composeEnhancers(
            applyMiddleware(thunk),
            persistState("", {
                key: 'newsspa-data'
            }),
        ),
    );
}