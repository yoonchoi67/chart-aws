import { FETCH_SOURCE_LIST } from '../constants/actionTypes';

const processed_source_list = (initialState = ['all sources'], action) => {
    switch (action.type) {
        case FETCH_SOURCE_LIST:
            return action.payload;
        default:
            return initialState;
    }
};
export default processed_source_list;
