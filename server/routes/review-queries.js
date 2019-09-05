const pool = require('./db_config');

async function getAllReviews() {
    try {
        const reviews = await pool.query('SELECT * FROM reviews ORDER BY id ASC');
        return reviews.rows;
    }
    catch (error) {
        console.log(error);
    }
}

async function getReviewByReferal(refCode) {
    try {
        const reviews = await pool.query('SELECT * FROM reviews WHERE ref_code = $1', [refCode]);
        return reviews.rows;
    }
    catch (error) {
        console.log(error);
    }
}

async function getReviewsByReviewer(reviewer) {
    try {
        const reviews = await pool.query('SELECT * FROM reviews WHERE reviewer_name = $1', [reviewer]);
        return reviews.rows;
    }
    catch (error) {
        console.log(error);
    }
}

async function getReviewsByScore(score) {
    try {
        const reviews = await pool.query('SELECT * FROM reviews WHERE score = $1', [score]);
        return reviews.rows;
    }
    catch (error) {
        console.log(error);
    }
}

async function getReviewsByMovieName(movieName) {
    try {
        const reviews = await pool.query('SELECT * FROM reviews WHERE movie_name = $1', [movieName]);
        return reviews.rows;
    }
    catch (error) {
        console.log(error);
    }
}

async function clearTable() {
    try {
        await pool.query('ALTER SEQUENCE reviews_id_seq RESTART');
        await pool.query('TRUNCATE reviews');
    }
    catch (error) {
        console.log(error);
    }
}

async function insertIntoTable(refCode, review, score, movieName, reviewerName) {
    try {
        await pool.query(`INSERT INTO reviews (ref_code, review, score, movie_name, reviewer_name)
        VALUES ($1, $2, $3, $4, $5)`, [refCode, review, score, movieName, reviewerName]);
    }
    catch (error) {
        console.log(error);
    }
}

function createTable() {
    try {
        pool.query(`CREATE TABLE reviews (
            id SERIAL,
            ref_code text,
            review text,
            score integer,
            movie_name text,
            reviewer_name text
            )`);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllReviews,
    clearTable,
    insertIntoTable,
    createTable,
    getReviewByReferal,
    getReviewsByReviewer,
    getReviewsByScore,
    getReviewsByMovieName
};

require('make-runnable');