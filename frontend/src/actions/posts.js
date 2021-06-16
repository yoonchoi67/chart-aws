import { FETCH_DATA, FETCH_PROCESSED_TICKER_LIST, FETCH_SEARCH_VALUE, FETCH_CLICKED_TICKER } from '../constants/actionTypes';
//, CREATE, UPDATE, DELETE, LIKE }
import * as api from '../api/index.js';

export const getData = (chartTicker) => async (dispatch) => {
  try {
    let config = {
      params: {
        ticker: chartTicker
      }
    }
    const { data } = await api.fetchPosts(config);
    dispatch({ type: FETCH_DATA, payload: data });
  } catch (error) {
    console.log("error in getData: ", error);
  }
}

export const getProcessedTickerList = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProcessedTickerList();
    dispatch({ type: FETCH_PROCESSED_TICKER_LIST, payload: data })
  } catch (error) {
    console.log("error in getProcessedTickerList: ", error)
  }
}
export const setClickedTicker = (text) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CLICKED_TICKER, payload: text })
  } catch (error) {
    console.log("error in setClickedTicker: ", error)
  }
}