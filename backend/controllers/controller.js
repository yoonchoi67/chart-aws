import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from "dotenv";
import { DynamoDBClient, GetItemCommand, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import AWS from 'aws-sdk';
import yahooFinance from "yahoo-finance"


//env variables configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

//router
const router = express.Router();

var dynamodb = new AWS.DynamoDB({ region: process.env.REGION });

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
    // else console.log(data.Items[0])
    res.status(200).json(data.Items);
    // return data.Items;
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

  // console.log("req.query in yahoo finance: ", req.query); //req.query in yahoo finance:  { ticker: 'TSLA' }
  // console.log("req.query.ticker in yahoo finance: ", req.query.ticker); //req.query.ticker in yahoo finance:  TSLA
  // console.log("req.query.ticker[0] in yahoo finance: ", req.query.ticker[0]); //req.query.ticker[0] in yahoo finance:  T

  yahooFinance.quote({
    symbol: req.query.ticker,
    modules: ["recommendationTrend", "defaultKeyStatistics", "summaryProfile", "financialData"]
  }, function (err, quoteInfo) {
    // }, httpRequestOptions, function (err, quoteInfo) {
    if (err) {
      console.log("error in ticker financial table: ", err);
      res.status(200).json(err);
    } else {
      console.log("QUOTEINFO: ", quoteInfo);
      res.status(200).json(quoteInfo);
    }

  })

}

export default router;