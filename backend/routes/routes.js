import express from 'express';

import { getTicker } from '../controllers/cont.js';

const router = express.Router();

router.get('/getT', getTicker);
// router.get('/getSentiment', getSentiment);


export default router;