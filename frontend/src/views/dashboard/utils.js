export function getSearchOptions (processedTickers) {
    let res = processedTickers.filter((ticker) => ticker !== "all_tickers")
    res.sort()
    res = ["ALL_TICKERS"].concat(res)
    return res
}