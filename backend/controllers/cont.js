import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from "dotenv";
import { DynamoDBClient, BatchExecuteStatementCommand, ListTablesCommand  } from "@aws-sdk/client-dynamodb";

//env variables configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

//router
const router = express.Router();


export const getTicker = async (req, res) => { 
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