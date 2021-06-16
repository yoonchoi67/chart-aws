// import React, { useContext, useState } from 'react'

// const DataContext = React.createContext()

// export function useDataContext() {
//     return useContext(DataContext)
// }
// 
// export function DataContextProvider({ children }) {

//     const [chartTicker, setChartTicker] = useState("all_tickers")

//     const [overallTickerData, setOverallTickerData] = useState({})
//     const [displayedPosts, setDisplayedPosts] = useState({})
//     const [chartTickerSource, setChartTickerSource] = useState("all")
//     const [sourcesForTicker, setSourcesForTicker] = useState(null)
//     const [rawTickerData, setRawTickerData] = useState(null)
//     const [flairFilter, setFlairFilter] = useState("all")
//     const [overallMentionsData, setOverallMentionsData] = useState({})
//     const [processedTickers, setProcessedTickers] = useState([])
//     const [searchValue, setSearchValue] = useState([])
//     const [watchlist, setWatchList] = useState(["GME", "AMC"])
//     const [trendsSource, setTrendsSource] = useState("all")
//     const [trendsTimeFrame, setTrendsTimeFrame] = useState("last_24hrs")

//     function addDisplayedPosts(querySnapshot) {
//         let newDisplayedPosts = {}
//         querySnapshot.forEach((docSnapshot) => {
//             newDisplayedPosts[docSnapshot.id] = docSnapshot.data()
//         })
//         setDisplayedPosts((prevState) => {
//             return { ...prevState, ...newDisplayedPosts }
//         })
//     }

//     function getChartTickerLabel () {
//         return chartTicker === "all_tickers" ? "All Tickers" : chartTicker
//     }
    
//     const value = {
//         processedTickers,
//         overallTickerData,
//         overallMentionsData,
//         displayedPosts,
//         chartTicker,
//         chartTickerSource,
//         sourcesForTicker,
//         rawTickerData,
//         flairFilter,
//         searchValue,
//         watchlist,
//         trendsSource,
//         trendsTimeFrame,
//         setProcessedTickers,
//         setOverallTickerData,
//         setOverallMentionsData,
//         setDisplayedPosts,
//         addDisplayedPosts,
//         setChartTicker,
//         setChartTickerSource,
//         setSourcesForTicker,
//         setRawTickerData,
//         setFlairFilter,
//         getChartTickerLabel,
//         setSearchValue,
//         setWatchList,
//         setTrendsSource,
//         setTrendsTimeFrame
//     }

//     return (
//        <DataContext.Provider value={value}>
//            { children }
//        </DataContext.Provider>     
//     )
// }
