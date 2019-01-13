import { CHANGE_LANGUAGE } from './../constants';

export default (state = {}, action) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            const language = action.payload;
            return {
                language
            };
        default:
            return state
    }
}