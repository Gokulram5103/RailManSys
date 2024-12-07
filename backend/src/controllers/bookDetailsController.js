import pool from '../config/db.js'; 

export const getBookingDetails = (req, res) => {
    const bookingId = req.params.booking_id;  
    const userId = req.user.id;  

    const query = `
        SELECT bookings.id, bookings.seats_booked, bookings.booking_date, trains.name AS train_name, trains.source, trains.destination
        FROM bookings
        JOIN trains ON bookings.train_id = trains.id
        WHERE bookings.id = ? AND bookings.user_id = ?;
    `;

    pool.query(query, [bookingId, userId], (err, result) => {
        if (err) {
            console.error("Error during query:", err);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Booking not found.' });
        }

        const bookingDetails = result[0];
        return res.status(200).json({
            booking_id: bookingDetails.id,
            train_name: bookingDetails.train_name,
            source: bookingDetails.source,
            destination: bookingDetails.destination,
            seats_booked: bookingDetails.seats_booked,
            booking_date: bookingDetails.booking_date
        });
    });
};
