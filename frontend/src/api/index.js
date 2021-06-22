import axios from 'axios';

export const IS_DEVELOPMENT = window.location.hostname === 'localhost'
export const IS_PRODUCTION = !IS_DEVELOPMENT

const url = IS_PRODUCTION ? 'http://ec2-54-180-26-58.ap-northeast-2.compute.amazonaws.com:3000' : 'http://localhost:3000'

export const fetchPosts = (config) => {

    return axios.get(`${url}/getTrends`, config);
    // const r = axios.get(`${url}/getTrends`, config);
    // const prom = r.then((response) => response);
    // return prom
};

export const fetchProcessedTickerList = () => {
    // return axios.get(`${url}/getTickerList`)

    const r = axios.get(`${url}/getProcessedTickerList`);
    // console.log("FECH: ", r)
    const prom = r.then((response) => response);
    return prom
};

export const fetchYahooFinanceData = (config) => {
    // return axios.get(`${url}/getTickerList`, config)

    let r = axios.get(`${url}/getYahooFinanceData`, config);
    // let r = fetch(`${url}/getYahooFinanceData`, config);
    const prom = r.then((response) => response);
    return prom;

};

export const fetchGoogleFinanceData = (config) => {
    console.log(config)
    // return axios.get(`${url}/getTickerList`, config)
    let r = axios.get(`${url}/getGoogleFinanceData`, config);
    // let r = fetch(`${url}/getYahooFinanceData`, config);
    const prom = r.then((response) => response);
    return prom;

};