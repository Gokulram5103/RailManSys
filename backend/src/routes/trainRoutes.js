import express from 'express';
import pool from '../config/db.js'; 
import { verifyAdmin } from '../middlewares/auth.js'; 

const router = express.Router();

router.post('/add-train', verifyAdmin, async (req, res) => {
    const { name, source, destination } = req.body;

    if (!name || !source || !destination) {
        return res.status(400).json({ error: 'Please provide train name, source, and destination.' });
    }

    try {
       
        const [newTrain] = await pool.execute(
            'INSERT INTO trains (name, source, destination) VALUES (?, ?, ?)',
            [name, source, destination]
        );

        return res.status(201).json({
            message: 'Train added successfully!',
            trainId: newTrain.insertId
        });
    } catch (error) {
        console.error('Error adding train:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
