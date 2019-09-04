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
}

function createTable() {
    console.log('creating');
    pool.query(`CREATE TABLE reviews (
        id SERIAL,
        ref_code text,
        review text,
        score integer,
        movie_name text,
        reviewer_name text
        )`, (err, res) => {
            console.log(err);
            console.log(res);
        });
}

module.exports = {
    getAllReviews,
    clearTable,
    insertIntoTable,
    createTable
};

require('make-runnable');