import React, { useEffect } from 'react'; //, { lazy, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProcessedTickerList } from '../../actions/posts';
import { store } from '../../index';
import { useDataContext } from "./DataContext"

import MainStockChart from "./MainStockChart";
import TickerFinancialsTable from "./TickerFinancialsTable";
// import TickerFinancialsTable1 from "./TickerFinancialsTable1";
import FilterBoard from "./FilterBoard";
import { getYahooFinanceData } from '../../actions/posts';


const Dashboard = (e) => {

  const { chartTicker, setProcessedTickers } = useDataContext()

  const dispatch = useDispatch();

  // console.log("current state in dashboard.js: ", store.getState());

  useEffect(() => {
    dispatch(getProcessedTickerList())
    // dispatch(getYahooFinanceData(chartTicker))
  }, [chartTicker])

  return (
    <>
      <FilterBoard />
      {chartTicker && <MainStockChart style={{ marginTop: '40px', marginBottom: "20px" }} />}
      {chartTicker && <TickerFinancialsTable />}
      {/* {clicked_ticker && clicked_ticker !== "all tickers" && <TickerFinancialsTable1 />} */}
      {/* {clicked_ticker && yahooFinanceData !== "all sources" && clicked_ticker !== "all tickers" && <TickerFinancialsTable />} */}

    </>
  )
}

export default Dashboard
