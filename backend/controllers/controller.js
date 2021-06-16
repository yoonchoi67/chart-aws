import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from "dotenv";
import { DynamoDBClient, GetItemCommand, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import AWS from 'aws-sdk';


//env variables configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

//router
const router = express.Router();

const params1 = {
  TableName: "sentiments",
  ConsistentRead: true,
  ExpressionAttributeValues: {
    ":ticker": {
      S: "TSLA"
    }
  },
  KeyConditionExpression: "ticker = :ticker",
};

var dynamodb = new AWS.DynamoDB({ region: process.env.REGION });

export const getTicker = async (req, res) => {

  console.log("req.query: ", req.query);
  console.log("req.query.ticker: ", req.query.ticker);
  console.log("req.query.ticker[0]: ", req.query.ticker[0]);

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
    else console.log(data.Items[0])
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
      console.log("error in controller in getProessedTickerList"); // an error occurred
    }
    // else console.log("data in processed ticker list in cont.js: ", data.Items)
    res.status(200).json(data.Items);
    // return data.Items;
  });

}

export const a = async (req, res) => {
  const dbClient = new DynamoDBClient({ region: process.env.REGION });
  // const command = new GetItemCommand({params});
  try {
    const data = await dbClient.send(new GetItemCommand(params));
    res.status(200).json(data)
    console.log("Success", data.Item);
    return data;
  } catch (err) {
    // res.status(404).json({ message: error.message });
    console.error(err);
    console.log("ERROR ERROR");
  }
};
// run();

export const b = async (req, res) => {
  const dbClient = new DynamoDBClient({ region: process.env.REGION });
  const command = new ListTablesCommand({});

  try {
    const results = await dbClient.send(command);
    res.status(200).json(results)
    console.log(results.TableNames.join('\n'));
  } catch (err) {
    res.status(404).json({ message: error.message });
    console.error(err);
  }
}

// (async function() {

//     const dbClient = new DynamoDBClient({ region: process.env.REGION });
//     const command = new ListTablesCommand({});

//     try {
//       const results = await dbClient.send(command);
//       console.log(results.TableNames.join('\n'));
//     } catch (err) {
//       console.error(err);
//     }
//   })();

export default router;