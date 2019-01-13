import { combineReducers } from 'redux';
import themeReducer from './theme';
import languageReducer from './language';

export default combineReducers({
    theme: themeReducer,
    language: languageReducer
});