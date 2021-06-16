import React, { useState, useEffect } from 'react'; //, { lazy, useEffect } from 'react'
import { useDispatch, useSelector, getState } from 'react-redux'
import { getProcessedTickerList } from '../../actions/posts';
import {
  CButton, CCard, CCardBody, CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CForm
} from '@coreui/react'
import { store } from '../../index';

import MainChartExample from './MainStockChart';
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea
} from '@coreui/react-chartjs';
import MainStockChart from "./MainStockChart";
import TickerFinancialsTable from "./TickerFinancialsTable";
import { getYahooFinanceData } from '../../actions/posts';


const Dashboard = (e) => {

  const dispatch = useDispatch();
  const clicked_ticker = useSelector((state) => state.clicked_ticker);
  const yahooFinanceData = useSelector((state) => state.yahoo_finance_data);

  //just checking the current state tree
  console.log("current state in dashboard.js: ", store.getState());

  useEffect(function () {

    //display only the tickers that are processed
    //retrieve the list of processed ticker list in the main dashboard
    dispatch(getProcessedTickerList());
    dispatch(getYahooFinanceData(clicked_ticker));

  }, [])

  return (
    <>
      {clicked_ticker && yahooFinanceData !== "all sources" && clicked_ticker !== "all tickers" && <TickerFinancialsTable />}
      <MainStockChart style={{ marginTop: '40px', marginBottom: "20px" }} />

    </>
  )
}

export default Dashboard
