import express from 'express';

import { getTrends, getProcessedTickerList, getYahooFinanceData, getGoogleFinanceData } from '../controllers/controller.js';

const router = express.Router();

router.get('/getTrends', getTrends);
router.get('/getProcessedTickerList', getProcessedTickerList);
router.get('/getYahooFinanceData', getYahooFinanceData);
router.get('/getGoogleFinanceData', getGoogleFinanceData);

router.get('/', function (req, res) {
    res.send('hello world')
});

export default router;