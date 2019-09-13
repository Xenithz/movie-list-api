const pool = require('./db_config');
const uuidv1 = require('uuid/v1');

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

async function insertIntoTable(body) {
    try {
        await pool.query(`INSERT INTO reviews (ref_code, review, score, movie_name, reviewer_name)
        VALUES ($1, $2, $3, $4, $5)`, [body.refCode, body.review, body.score, body.movieName, body.reviewerName]);
        
        const response = {
            message: `Created new review (refCode: ${body.refCode})`
        };

        return response;
    }
    catch (error) {
        console.log(error);
    }
}

async function updateOrCreateReview(body, refCode) {
    try {
        const idCheck = await refCodeLookup(refCode);

        if(idCheck.rowCount === 0) {
            const refCode = uuidv1();

            await insertIntoTable(refCode, body.review, body.score, body.movieName, body.reviewerName);

            const response = {
                message: 'Created new review',
                id: `${body.refCode}`
            };
            
            return response;
        }
        else {
            await pool.query(`UPDATE reviews
            SET ref_code = $2,
            review = $3,
            score = $4,
            movie_name = $5,
            reviewer_name = $6
            WHERE ref_code = $1`, [refCode, body.refCode, body.review, body.score, body.movieName, body.reviewerName]);

            const response = {
                message: 'Updated review',
                id: `${body.refCode}`
            };
            
            return response;
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteReview(refCode) {
    try {
        await pool.query('DELETE FROM reviews WHERE ref_code = $1', [refCode]);

            const response = {
                "message": `Deleted movie`,
                id: `${refCode}`
            };

            return response;
    }
    catch (error) {
        console.log(error);
    }
}

async function refCodeLookup(refCode) {
    const check = await pool.query('SELECT * FROM reviews WHERE ref_code = $1', [refCode]);
    return check;
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
    getReviewsByMovieName,
    updateOrCreateReview,
    deleteReview
};

require('make-runnable');