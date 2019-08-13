const pool = require('./db_config');

async function getAllMovies() {
    try {
        const movies = await pool.query('SELECT * FROM movies ORDER BY id ASC');
        return movies.rows;
    }
    catch {
        console.log('failed db');   
    }
}

async function getMovieByID(movieID) {
    try {
        const movie = await pool.query('SELECT * FROM movies WHERE movie_id = $1', [movieID]);
        return movie.rows;
    }
    catch{
        console.log('failed db');   
    }
}

async function getMovieByTitle(movieTitle) {
    try {
        const movies = await pool.query('SELECT * FROM movies WHERE movie_title = $1', [movieTitle]);
        return movies.rows;
    }
    catch {
        console.log('failed db');
    }
}

async function getMovieByGenre(movieGenre) {
    try {
        const movies = await pool.query('SELECT * FROM movies WHERE movie_genre = $1', [movieGenre]);
        return movies.rows;
    }
    catch {
        console.log('failed db');
    }
}

async function getMovieByDirector(movieDirector) {
    try {
        const movies = await pool.query('SELECT * FROM movies WHERE movie_director = $1', [movieDirector]);
        return movies.rows;
    }
    catch {
        console.log('failed db');
    }
}

module.exports = {
    getAllMovies,
    getMovieByID,
    getMovieByTitle,
    getMovieByGenre,
    getMovieByDirector
};