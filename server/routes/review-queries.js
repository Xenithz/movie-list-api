const pool = require('./db_config');

async function getAllReviews() {
    try {
        const reviews = await pool.query('SELECT * FROM reviews ORDER BY id ASC');
        return reviews.rows;
    }
    catch {
        console.log('failed db');
    }
}

module.exports = {
    getAllReviews
};