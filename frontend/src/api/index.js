import axios from 'axios';

const url = 'http://localhost:3000';
// const HOST = window.location.hostname + ':3001'

export const fetchPosts = (config) => {

    return axios.get(`${url}/getTrends`, config);
    const r = axios.get(`${url}/getTrends`, config);
    const prom = r.then((response) => response);
    return prom
};

export const fetchProcessedTickerList = () => {
    // return axios.get(`${url}/getTickerList`)

    const r = axios.get(`${url}/getProcessedTickerList`);
    // console.log("FECH: ", r)
    const prom = r.then((response) => response);
    return prom

}

export const fetchYahooFinanceData = (config) => {
    // return axios.get(`${url}/getTickerList`, config)

    let r = axios.get(`${url}/getYahooFinanceData`, config);
    const prom = r.then((response) => response);
    return prom;
    console.log("RRRR: ", prom);
    // let prom = r.then((response) => response.json());
    console.log(prom);
    var result = [];

    for (var i in prom)
        result.push([i, prom[i]]);

    console.log(result);
    // console.log("PROM: ", prom.);
    // console.log("PROM: ", prom.defaultKeyStatistics);
    // console.log("PROM: ", prom.summaryProfile);

    return prom

}
