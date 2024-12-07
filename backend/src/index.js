import express from 'express';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import trainRoutes from './routes/trainRoutes.js';
import seatRoutes from './routes/trainSeats.js'; 
import bookingRoutes from './routes/bookingRoutes.js';
import seats from './routes/getSeatRutes.js';  
import bookDetails from './routes/bookDetails.js';


const app = express();
app.use(express.json());
app.use(cors()); 
app.use('/api/auth', authRoutes); // user / admin auth with rbac
app.use('/api/trains', trainRoutes); // admin add trains
app.use('/api/seats', seatRoutes); // admin add seats for train 

app.use('/api', seats); // this is for user see the no of seats available 

app.use('/api/bookings', bookingRoutes); // // this is for user to book a seat 
app.use('/api', bookDetails); // user get booking details
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
