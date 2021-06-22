import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from "dotenv";
import { DynamoDBClient, GetItemCommand, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import AWS from 'aws-sdk';
import yahooFinance from "yahoo-finance";
import googleFinance from "google-finance";
import robinhood from "robinhood";

//env variables configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

//router
const router = express.Router();

var dynamodb = new AWS.DynamoDB({ region: 'ap-northeast-2' });

export const getTicker = async (req, res) => {

  // console.log("req.query: ", req.query); // req.query:  { ticker: 'TSLA' }
  // console.log("req.query.ticker: ", req.query.ticker); //req.query.ticker:  TSLA
  // console.log("req.query.ticker[0]: ", req.query.ticker[0]); //req.query.ticker[0]:  T

  const params = {
    TableName: "sentiments",
    ConsistentRead: true,
    ExpressionAttributeValues: {
      ":ticker": {
        S: req.query.ticker
      }
    },
    KeyConditionExpression: "ticker = :ticker",
  };

  dynamodb.query(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      console.log("error in controller in getTicker"); // an error occurred
    }
    res.status(200).json(data.Items);
  });

};

export const getProcessedTickerList = async (req, res) => {

  const params = {
    TableName: "processed_ticker_list",
    Select: "ALL_ATTRIBUTES"
  };

  dynamodb.scan(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      console.log("error in controller in getProessedTickerList. err: ", err, ", and err.stack: ", err.stack); // an error occurred
    }
    res.status(200).json(data.Items);
  });

}

export const getYahooFinanceData = async (req, res) => {

  yahooFinance.quote({
    symbol: req.query.ticker,
    modules: ["recommendationTrend", "defaultKeyStatistics", "summaryProfile", "financialData"]
  }, function (err, quoteInfo) {
    // }, httpRequestOptions, function (err, quoteInfo) {
    if (err) {
      console.log("error in ticker financial table: ", err);
      res.status(200).json(err);//
    } else {
      // console.log("QUOTEINFO: ", quoteInfo);
      res.status(200).json(quoteInfo);
    }

  })

}
var credentials = { // obviously add this to process.env
  username: 'ch67',
  password: '4M67ydzkk!'
  // username: process.env.REACT_APP_ROBINHOOD_USERNAME,
  // password: process.env.REACT_APP_ROBINHOOD_PASSWORD,
  // grant_type: process.env.REACT_APP_ROBINHOOD_GRANT_TYPE,
  // client_id: process.env.REACT_APP_ROBINHOOD_CLIENT_ID,
  // device_token: process.env.REACT_APP_ROBINHOOD_DEVICE_TOKEN
}

export const getGoogleFinanceData = async (req, res) => {
  console.log("robinhood received");
  
  let Robinhood = robinhood(credentials, function() {
    console.log("AUTH TOKEN: ", Robinhood.auth_token());
    // if (data && data.mfa_required) {
    //     var mfa_code = ""; //Notice this is blank. 
    //     Robinhood.set_mfa_code(mfa_code, () => {
    //         console.log(Robinhood.auth_token());
    //         Robinhood.positions((error, response, body) => {
    //             console.log(body);
    //         })
    //     })
    // }
})
  // var Robinhood = robinhood(credentials, function(data){ // call this everytime ticker changes
  //   Robinhood.news(chartTicker, (err, response, body) => {
  //     if (err) {
  //       console.log(err)
  //     }
  //     else {
  //       body.results.sort(function(newsA, newsB) {
  //         return moment(newsB.published_at).diff(moment(newsA.published_at))
  //       })
  //       setTickerNews(body.results)
  //     }
  //   })
  // })

}

// export const getGoogleFinanceData = async (req, res) => {
//   console.log(req.query.ticker)
//   googleFinance.historical({
//     // symbol: req.query.ticker,
//     symbol: 'NASDAQ:AAPL',
//   }, function (err, quoteInfo) {
//     if (err) {
//       console.log("error in ticker financial table: ", err);
//       res.status(200).json(err);
//     } else {
//       console.log("QUOTEINFO: ", quoteInfo);
//       res.status(200).json(quoteInfo);
//     }

//   })

// }

export default router;