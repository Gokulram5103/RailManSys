import pool from '../config/db.js';

export const getAvailableSeats = async (req, res) => {
    const { train_id } = req.params; 

    if (!train_id) {
        return res.status(400).json({ error: 'Please provide train_id.' });
    }

    try {
        
        const [seatAvailability] = await pool.execute(
            'SELECT seats_available FROM seat_availability WHERE train_id = ?',
            [train_id]
        );

        if (seatAvailability.length === 0) {
            return res.status(404).json({ error: 'Train not found or no seat availability data available.' });
        }

        return res.status(200).json({
            train_id,
            available_seats: seatAvailability[0].seats_available,
        });
    } catch (error) {
        console.error('Error fetching seat availability:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
