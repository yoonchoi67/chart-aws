import axios from 'axios';

export const IS_DEVELOPMENT = window.location.hostname === 'localhost'
export const IS_PRODUCTION = !IS_DEVELOPMENT

const url = IS_PRODUCTION ? 'http://ec2-54-180-26-58.ap-northeast-2.compute.amazonaws.com:3000' : 'http://localhost:3000'

export const fetchPosts = (config) => { return axios.get(`${url}/getTrends`, config).then(response => response); };
export const fetchProcessedTickerList = () => { return axios.get(`${url}/getProcessedTickerList`).then(response => response); };
export const fetchYahooFinanceData = (config) => { return axios.get(`${url}/getYahooFinanceData`, config).then(response => response); };
export const fetchGoogleFinanceData = (config) => { return axios.get(`${url}/getGoogleFinanceData`, config).then(response => response); };