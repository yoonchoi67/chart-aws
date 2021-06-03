import express from 'express';

import { getTicker } from '../controllers/cont.js';

const router = express.Router();

router.get('/trends', getTicker);
router.get('/', function (req, res) {
    res.send('hello world')
});

export default router;