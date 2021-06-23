import { FETCH_GOOGLE_FINANCE_DATA } from '../constants/actionTypes';

const google_finance_data = (initialState = [{}], action) => {
    switch (action.type) {
        case FETCH_GOOGLE_FINANCE_DATA:
            return action.payload;
        default:
            return initialState;
    }
};
export default google_finance_data;
