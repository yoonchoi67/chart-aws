import { FETCH_PROCESSED_TICKER_LIST } from '../constants/actionTypes';

const processed_ticker_list = (initialState = "all sources", action) => {
    switch (action.type) {
        case FETCH_PROCESSED_TICKER_LIST:
            return action.payload;
        default:
            return initialState;
    }
};
export default processed_ticker_list;
