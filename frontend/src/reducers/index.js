import { combineReducers } from 'redux';

import posts from './posts';

import processed_ticker_list from './processed_ticker_list';
import processed_source_list from './processed_source_list';
import yahoo_finance_data from './yahoo_finance_data';

import clicked_source from './clicked_source';
import clicked_ticker from './clicked_ticker';
import sidebarShow from './sidebarShow';
import google_finance_data from './google_finance_data';

export const reducers = combineReducers({ posts, processed_ticker_list, processed_source_list, clicked_source, clicked_ticker, yahoo_finance_data, sidebarShow, google_finance_data });//, core_ui });
