import { QUERY } from './../constants';

export default (state = {}, action) => {
    switch (action.type) {
        case QUERY:
            const query = action.payload;
            return {
                query,
            };
        default:
            return state
    }
}