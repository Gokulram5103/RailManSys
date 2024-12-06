import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import db from './config/db.js';

const app = express();

dotenv.config()

app.use(express.json());
app.use(morgan("dev"));
app.get('/test', (req, res) => {

    res.status(200).send("<h1>Node js is running ....</h1>")
})

db.getConnection()
  .then(() => console.log('Database connected successfully!'))
  .catch((err) => console.error('Database connection failed:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Running port ${PORT}`);
});