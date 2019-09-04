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

async function clearTable() {
    await pool.query('ALTER SEQUENCE reviews_id_seq RESTART');
    await pool.query('TRUNCATE reviews');
}

async function insertIntoTable(refCode, review, score, movieName, reviewerName) {
    await pool.query(`INSERT INTO reviews (ref_code, review, score, movie_name, reviewer_name)
    VALUES ($1, $2, $3, $4, $5)`, [refCode, review, score, movieName, reviewerName]);

    console.log('inserted');
}

module.exports = {
    getAllReviews,
    clearTable,
    insertIntoTable
};