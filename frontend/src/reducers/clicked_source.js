import { FETCH_CLICKED_SOURCE } from '../constants/actionTypes';

const clicked_source = (initialState = ['all sources'], action) => {
    switch (action.type) {
        case FETCH_CLICKED_SOURCE:
            return action.payload;
        default:
            return initialState;
    }
};
export default clicked_source;
