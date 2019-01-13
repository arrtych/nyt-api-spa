import { QUERY } from './../constants';

export const query = (value) => dispatch => {
    dispatch({
        type: QUERY,
        payload: value
    })
};