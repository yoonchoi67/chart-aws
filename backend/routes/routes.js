import express from 'express';

import { getTicker, getProcessedTickerList, getYahooFinanceData } from '../controllers/controller.js';

const router = express.Router();

router.get('/getTrends', getTicker);
router.get('/getProcessedTickerList', getProcessedTickerList);
router.get('/getYahooFinanceData', getYahooFinanceData);

router.get('/', function (req, res) {
    res.send('hello world')
});

export default router;