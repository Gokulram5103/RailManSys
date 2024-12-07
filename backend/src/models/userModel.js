import db from '../config/db.js';

export const checkUserExists = (username, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], callback);
};

export const createUser = (username, password, role, email, callback) => {
    db.query(
        'INSERT INTO users (username, password, role_id, email) VALUES (?, ?, ?, ?)',
        [username, password, role, email],
        callback
    );
};
