import express from 'express';
import { createorder } from '../controllers/create_order.js';
import { verifyPayment } from '../controllers/verfiy_order.js';

const router = express.Router();

router.post('/createorder', createorder);
router.post('/verifypayment', verifyPayment);

export default router;