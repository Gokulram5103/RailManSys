import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';  
import dotenv from 'dotenv';

dotenv.config();

export const registerUser = async (req, res) => {
    const { username, password, role_id, email } = req.body;

    if (!username || !password || !role_id || !email) {
        return res.status(400).json({ error: 'Please provide username, password, role_id, and email.' });
    }

    try {
       
        const [existingUser] = await pool.execute(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [username, email]
        );


        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Username or email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [newUser] = await pool.execute(
            'INSERT INTO users (username, password, role_id, email) VALUES (?, ?, ?, ?)',
            [username, hashedPassword, role_id, email]
        );

        return res.status(201).json({
            message: 'User registered successfully!',
            userId: newUser.insertId
        });

    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password.' });
    }

    try {
       
        const [user] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

   
        if (user.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

      
        const isMatch = await bcrypt.compare(password, user[0].password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { userId: user[0].id, roleId: user[0].role_id },  
            process.env.JWT_SECRET,                         
            { expiresIn: '1h' }                              
        );

        return res.status(200).json({
            message: 'Login successful.',
            token: token,
        });

    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
