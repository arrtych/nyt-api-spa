import { combineReducers } from 'redux';
import themeReducer from './theme';
import languageReducer from './language';
import queryReducer from './query';

export default combineReducers({
    theme: themeReducer,
    language: languageReducer,
    query: queryReducer,
});