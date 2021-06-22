import React, { useEffect } from 'react'; //, { lazy, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProcessedTickerList } from '../../actions/posts';

import MainStockChart from "./MainStockChart";
import TickerFinancialsTable from "./TickerFinancialsTable";
// import TickerFinancialsTable1 from "./TickerFinancialsTable1";
import FilterBoard from "./FilterBoard";
import GoogleNews from "./GoogleNews";

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
      {/* {<GoogleNews/>} */}
      { <MainStockChart style={{ marginTop: '40px', marginBottom: "20px" }} />}
      {/* {clicked_ticker && clicked_ticker !== "all tickers" && <TickerFinancialsTable1 />} */}
      {/* {clicked_ticker && yahooFinanceData !== "all sources" && clicked_ticker !== "all tickers" && <TickerFinancialsTable />} */}

    </>
  )
}

export default Dashboard
