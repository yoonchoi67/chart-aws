import AWS from 'aws-sdk';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from "dotenv";
// import TickerModel from '../models/TickerModel.js';

//env variables configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

//router
const router = express.Router();

//aws configuration from env variables
let awsConfig = {
    "region": process.env.REGION,
    "endpoint": process.env.ENDPOINT,
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY
};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();

let fetchOneByKey = function () {
    var params = {
        TableName: "users",
        Key: {
            "email_id": "choi@gmail.com"
        }
    };
    docClient.get(params, function (err, data) {
        if (err) {
            console.log("ERROR - " + JSON.stringify(err, null, 2));
        }
        else {
            console.log("SUCCESS - " + JSON.stringify(data, null, 2));
        }
    })
}

fetchOneByKey();

// const fetchOneByKey1 = async () => {
//     var params = {
//         TableName: "users",
//         Key: {
//             "email_id": "choi@gmail.com"
//         }
//     };
//     const data = await docClient.get(params);
//     console.log("SUCCESS: ", data)

// }

// fetchOneByKey1();
// process.exit(0);

// const run = async () => {
//     const data = await dbclient.send(new GetItemCommand(params));
//     console.log("Success", data.Item);
// };
// run();


// const command = new BatchExecuteStatementCommand(params);


// client.send(command).then(
//     (data) => {
//         console.log(data)
//         // process data.
//     },
//     (error) => {
//         console.log(error)
//         // error handling.
//     }
// );


////////////////////
// client
//     .send(command)
//     .then((data) => {
//         // process data.
//     })
//     .catch((error) => {
//         // error handling.
//     })
//     .finally(() => {
//         // finally.
//     });


// export const getPosts = async (req, res) => {
//     try {
//         const postMessages = await PostMessage.find();

//         res.status(200).json(postMessages);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

export default router;