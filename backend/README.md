RailManSys
Install Dependencies:

Install Node.js and XAMPP.
Install the required dependencies by running:
bash
Copy code
npm install
Set up MySQL:

Start MySQL in XAMPP.
Create a database named train_book-system.
Configure your MySQL connection in config/db.js.
Start Server:
Run the server with:

npm start
Server will be available at http://localhost:5000.


Postman Usage:
Use Postman to test the API endpoints.
For protected routes, add Authorization: Bearer <token>.

API ENDPOINTS : Completed 
1. User Registration
POST /api/users/register
Body:
json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "roleId": 2
}
2. User Login
POST /api/users/login
Body:
json
{
    "email": "john@example.com",
    "password": "password123"
}
3. Add Train (Admin Only)
POST /api/trains/add-train
Body:
json
{
    "name": "Express 101",
    "source": "Mumbai",
    "destination": "Delhi"
}
4. Add Seats (Admin Only)
POST /api/seats/add-seats
Body:
json
{
    "train_id": 1,
    "seats_available": 100
}
5. Book a Seat
POST /api/booking/book-seat
Body:
json
{
    "user_id": 1,
    "train_id": 1,
    "seats_requested": 2
}
6. Get Booking Details (user Only)
GET /api/booking/:booking_id
Example: /api/booking/5
Use the Authorization: Bearer <jwt_token> header to authenticate the request.
7. Get All Bookings (Admin Only)
GET /api/booking/all
Admins can use this to view all bookings.
8. Check Available Seats
GET /api/seats/available/:train_id
Example: /api/seats/available/1