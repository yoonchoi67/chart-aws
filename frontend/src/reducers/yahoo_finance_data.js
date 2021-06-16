import { FETCH_YAHOO_FINANCE_DATA } from '../constants/actionTypes';

const yahoo_finance_data = (initialState = "all sources", action) => {
    switch (action.type) {
        case FETCH_YAHOO_FINANCE_DATA:
            return action.payload;
        default:
            return initialState;
    }
};
export default yahoo_finance_data;
