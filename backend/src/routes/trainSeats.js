import express from 'express';
import { manageSeatAvailability } from '../controllers/Seats.js';
import { verifyAdmin } from '../middlewares/auth.js'; 

const router = express.Router();


router.post('/seat-availability', verifyAdmin, manageSeatAvailability);

export default router;
