import { CHANGE_THEME } from './../constants';

export const changeTheme = (value) => dispatch => {
    dispatch({
        type: CHANGE_THEME,
        payload: value
    })
};