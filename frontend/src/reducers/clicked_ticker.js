import { FETCH_CLICKED_TICKER } from '../constants/actionTypes';

const clicked_ticker = (initialState = "all tickers", action) => {
    switch (action.type) {
        case FETCH_CLICKED_TICKER:
            return action.payload;
        default:
            return initialState;
    }
};
export default clicked_ticker;
    