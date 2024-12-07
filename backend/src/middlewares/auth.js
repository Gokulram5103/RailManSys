import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ error: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.roleId !== 1) {
            return res.status(403).json({ error: 'You are not authorized to perform this action.' });
        }

        req.user = decoded; 
        next(); 
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Invalid or expired token.' });
    }
};
