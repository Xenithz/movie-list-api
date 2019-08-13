const pool = require('./db_config');

async function getAllMovies() {
    try{
        const movies = await pool.query('SELECT * FROM movies ORDER BY id ASC');
        return movies;
    }
    catch{
        console.log('failed db');   
    }
}

async function getMovieByID(movieID) {
    try{
        const movies = await pool.query(`SELECT * FROM movies WHERE movie_id = ${movieID}`);
        return movies;
    }
    catch{
        console.log('failed db');   
    }
}

module.exports = {
    getAllMovies,
    getMovieByID
};