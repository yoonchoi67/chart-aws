import React, { useEffect } from 'react'; //, { lazy, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProcessedTickerList } from '../../actions/posts';

import MainStockChart from "./MainStockChart";
import TickerFinancialsTable from "./TickerFinancialsTable";
import FilterBoard from "./FilterBoard";
import GoogleNews from "./GoogleNews";
import { store } from "./../../index";
// main dashboard that will be a parent for all the other components
const Dashboard = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProcessedTickerList())
  }, [])

  return (
    <>
      <FilterBoard />
      {<TickerFinancialsTable />}
      {<GoogleNews/>}
      { <MainStockChart style={{ marginTop: '40px', marginBottom: "20px" }} />}

    </>
  )
}

export default Dashboard
