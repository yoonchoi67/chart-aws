import React, { useContext, useState } from 'react'

const DataContext = React.createContext()

export function useDataContext() {
    return useContext(DataContext)
}

export function DataContextProvider({ children }) {

    const [chartTicker, setChartTicker] = useState("AMC")
    const [processedTickers, setProcessedTickers] = useState([])
    const [tickerInfo, setTickerInfo] = useState({})
    const [newsInfo, setNewsInfo] = useState()
    const [yahooFinanceData, setyahooFinanceData] = useState()
    const [googleNewsData, setgoogleNewsData] = useState()

    // const [overallTickerData, setOverallTickerData] = useState({})
    // const [displayedPosts, setDisplayedPosts] = useState({})
    
    const [chartTickerSource, setChartTickerSource] = useState("all")
    const [sourcesForTicker, setSourcesForTicker] = useState(null)
    
    
    const [searchValue, setSearchValue] = useState(["AMC"])
    
    const [flairFilter, setFlairFilter] = useState("all") //defer
    const [rawTickerData, setRawTickerData] = useState(null) //defer
    function getChartTickerLabel () {
        return chartTicker === "all_tickers" ? "all tickers" : chartTicker
    }
    
    const value = {tickerInfo, setTickerInfo,
        processedTickers,
        yahooFinanceData, 
        googleNewsData, 
        chartTicker,
        chartTickerSource,
        sourcesForTicker,
        rawTickerData,
        flairFilter,
        searchValue,
        newsInfo, 
        setyahooFinanceData,
        setgoogleNewsData,
        setNewsInfo,
        setProcessedTickers,
        setChartTicker,
        setChartTickerSource,
        setSourcesForTicker,
        setRawTickerData,
        setFlairFilter,
        getChartTickerLabel,
        setSearchValue
    }

    return (
       <DataContext.Provider value={value}>
           { children }
       </DataContext.Provider>     
    )
}
