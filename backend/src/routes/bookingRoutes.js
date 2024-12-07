import express from 'express';
import { bookSeat } from '../controllers/bookingController.js';
import { authenticateToken } from '../middlewares/authUsers.js';

const router = express.Router();

router.post('/book-seat', authenticateToken, bookSeat);

export default router;
