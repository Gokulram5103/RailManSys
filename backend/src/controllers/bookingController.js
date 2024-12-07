import pool from '../config/db.js';

export const bookSeat = async (req, res) => {
    const { user_id, train_id, seats_requested } = req.body;

    if (!user_id || !train_id || !seats_requested) {
        return res.status(400).json({ error: 'please provide user_id, train_id, and seats_requested.' });
    }

    try {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const [seatRow] = await connection.execute(
                'SELECT seats_available FROM seat_availability WHERE train_id = ? FOR UPDATE',
                [train_id]
            );

            if (seatRow.length === 0) {
                throw new Error('Train not found or no seats available for this train.');
            }

            const seatsAvailable = seatRow[0].seats_available;

            if (seatsAvailable < seats_requested) {
                throw new Error('not enough seats available.');
            }

            const newSeatsAvailable = seatsAvailable - seats_requested;
            await connection.execute(
                'UPDATE seat_availability SET seats_available = ? WHERE train_id = ?',
                [newSeatsAvailable, train_id]
            );

            await connection.execute(
                'INSERT INTO bookings (user_id, train_id, seats_booked) VALUES (?, ?, ?)',
                [user_id, train_id, seats_requested]
            );

            await connection.commit();

            res.status(200).json({
                message: 'Seat(s) booked successfully.',
                train_id,
                seats_booked: seats_requested,
            });
        } catch (error) {
            await connection.rollback();
            console.error('Booking failed:', error.message);
            res.status(400).json({ error: error.message });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database connection error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
