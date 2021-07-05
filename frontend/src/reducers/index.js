import { combineReducers } from 'redux';

import google_finance_data from './google_finance_data';
import posts from './posts';
import processed_ticker_list from './processed_ticker_list';
import sidebarShow from './sidebarShow';
import yahoo_finance_data from './yahoo_finance_data';

export const reducers = combineReducers({ posts, processed_ticker_list, yahoo_finance_data, sidebarShow, google_finance_data });