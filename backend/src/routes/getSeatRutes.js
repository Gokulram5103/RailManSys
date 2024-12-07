import express from 'express';
import { getAvailableSeats } from '../controllers/getSeatController.js';

const router = express.Router();

router.get('/seats/availability/:train_id', getAvailableSeats);

export default router;
