import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js'; // Ensure paths are correct

const router = express.Router();

router.post('/register', registerUser);


router.post('/login', loginUser);

export default router;
