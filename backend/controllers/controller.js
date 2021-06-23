import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from "dotenv";
import { DynamoDBClient, GetItemCommand, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import AWS from 'aws-sdk';
import yahooFinance from "yahoo-finance";
import unirest from "unirest";

dotenv.config();
//env variables configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// dotenv.config({ path: path.resolve(__dirname, '../.env') });

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

export const getGoogleFinanceData = async (req, res) => {

  var request = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete");
  request.query({
    "q": req.query.ticker,
    "region": "US"
  });
  request.headers({
    "x-rapidapi-key": "8925445ad2msh518cb2c43f027e5p18a775jsn8790ac7220f1",
    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    "useQueryString": true
  });
  request.end(function (response) {
    if (response.error) throw new Error(response.error);
    res.status(200).json(response.body);
  })
};

export default router;