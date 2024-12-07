import pool from '../config/db.js'; 
export const manageSeatAvailability = async (req, res) => {
    const { train_id, seats_available } = req.body;

    if (!train_id || seats_available == null) {
        return res.status(400).json({ error: 'Please provide train_id and seats_available.' });
    }

    try {
        const [train] = await pool.execute('SELECT * FROM trains WHERE id = ?', [train_id]);
        if (train.length === 0) {
            return res.status(404).json({ error: 'Train not found.' });
        }

       
        const [existingAvailability] = await pool.execute(
            'SELECT * FROM seat_availability WHERE train_id = ?',
            [train_id]
        );

        if (existingAvailability.length > 0) {
           
            await pool.execute(
                'UPDATE seat_availability SET seats_available = ? WHERE train_id = ?',
                [seats_available, train_id]
            );
            return res.status(200).json({ message: 'Seat availability updated successfully.' });
        } else {
          
            await pool.execute(
                'INSERT INTO seat_availability (train_id, seats_available) VALUES (?, ?)',
                [train_id, seats_available]
            );
            return res.status(201).json({ message: 'Seat availability added successfully.' });
        }
    } catch (error) {
        console.error('Error managing seat availability:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
