import { CHANGE_LANGUAGE } from './../constants';

export const changeLanguage = (value) => dispatch => {
    dispatch({
        type: CHANGE_LANGUAGE,
        payload: value
    })
};