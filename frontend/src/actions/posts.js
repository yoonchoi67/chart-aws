import { FETCH_DATA, FETCH_PROCESSED_TICKER_LIST, FETCH_YAHOO_FINANCE_DATA, FETCH_GOOGLE_FINANCE_DATA, FETCH_CLICKED_TICKER } from '../constants/actionTypes';
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
    let result = [];
    data.forEach(arr => {result.push(arr.ticker.S)});
    result = result.slice(-30)
    dispatch({ type: FETCH_PROCESSED_TICKER_LIST, payload: result })
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

export const getYahooFinanceData = (chartTicker) => async (dispatch) => {
  try {
    let config = {
      params: {
        ticker: chartTicker
      }
    }
    const { data } = await api.fetchYahooFinanceData(config);
    dispatch({ type: FETCH_YAHOO_FINANCE_DATA, payload: data });
  } catch (error) {
    console.log("error in getYahooFinanceData: ", error);
  }
}


export const getGoogleFinanceData = (chartTicker) => async (dispatch) => {
  try {
    let config = {
      params: {
        ticker: chartTicker
      }
    }
    const { data } = await api.fetchGoogleFinanceData(config);
    dispatch({ type: FETCH_GOOGLE_FINANCE_DATA, payload: data });
  } catch (error) {
    console.log("error in getGoogleFinanceData: ", error);
  }
}