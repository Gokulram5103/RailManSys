import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

   
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access Denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
        req.user = decoded;

        next(); 
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(403).json({ error: 'Invalid or expired token.' });
    }
};
