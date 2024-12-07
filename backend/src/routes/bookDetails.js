import express from 'express';
import { getBookingDetails } from '../controllers/bookDetailsController.js';
import { authenticateToken } from '../middlewares/authUsers.js';

const router = express.Router();

router.get('/booking/:booking_id', authenticateToken, getBookingDetails);

export default router;
