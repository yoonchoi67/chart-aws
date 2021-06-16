import express from 'express';

import { getTicker, getProcessedTickerList } from '../controllers/controller.js';

const router = express.Router();

router.get('/getTrends', getTicker);
router.get('/getSentiments', getTicker);
router.get('/getProcessedTickerList', getProcessedTickerList);

router.get('/', function (req, res) {
    res.send('hello world')
});

export default router;