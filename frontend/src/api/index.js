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
    const prom = r.then((response) => response);
    return prom

}
