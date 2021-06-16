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


const Dashboard = (e) => {

  const dispatch = useDispatch();

  //just checking the current state tree
  console.log("current state in dashboard.js: ", store.getState());

  useEffect(function () {

    //display only the tickers that are processed
    //retrieve the list of processed ticker list in the main dashboard
    dispatch(getProcessedTickerList());

  }, [])

  return (
    <>
      <MainStockChart style={{ marginTop: '40px', marginBottom: "20px" }} />

    </>
  )
}

export default Dashboard
