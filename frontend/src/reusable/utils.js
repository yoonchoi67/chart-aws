export function getSearchOptions (processedTickers) {
    let res = processedTickers.filter((ticker) => ticker !== "TSLA")
    res.sort()
    res = ["TSLA"].concat(res)
    return res
}