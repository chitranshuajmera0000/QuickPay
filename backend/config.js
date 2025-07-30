require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development-only';

module.exports = {
    JWT_SECRET
}