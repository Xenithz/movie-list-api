const pool = require('./db_config');

async function getAllMovies() {
    try {
        const movies = await pool.query('SELECT * FROM movies ORDER BY id ASC');
        return movies.rows;
    }
    catch (error) {
        console.log(error);
    }
}

async function getMovieByID(movieID) {
    try {
        const movie = await pool.query('SELECT * FROM movies WHERE movie_id = $1', [movieID]);
        return movie.rows;
    }
    catch (error) {
        console.log(error);
    }
}

async function getMovieByTitle(movieTitle) {
    try {
        const movies = await pool.query('SELECT * FROM movies WHERE movie_title = $1', [movieTitle]);
        return movies.rows;
    }
    catch (error) {
        console.log(error);
    }
}

async function getMovieByGenre(movieGenre) {
    try {
        const movies = await pool.query('SELECT * FROM movies WHERE movie_genre = $1', [movieGenre]);
        return movies.rows;
    }
    catch (error) {
        console.log(error);
    }
}

async function getMovieByDirector(movieDirector) {
    try {
        const movies = await pool.query('SELECT * FROM movies WHERE movie_director = $1', [movieDirector]);
        return movies.rows;
    }
    catch (error) {
        console.log(error);
    }
}

async function createNewMovie(body) {
    try {
        const idCheck = await idQuery(body.movieid);

        if(idCheck.rowCount === 0) {
            await insertQuery(body);

            const response = {
                "message": `Created new movie (ID: ${body.movieid})`
            };
            
            return response;
        }
        else {
            const response = {
                "message": "Failed"
            };
            
            return response;
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function updateOrCreateMovie(body, movieID) {
    try {
        const idCheck = await idQuery(body.movieid);

        if(idCheck.rowCount === 0) {
            await insertQuery(body);

            const response = {
                "message": `Created new movie (ID: ${body.movieid})`
            };
            
            return response;
        }
        else {
            await pool.query(`UPDATE movies
            SET movie_id = $2,
            movie_title = $3,
            movie_genre = $4,
            movie_director = $5
            WHERE movie_id = $1`, [movieID, body.movieid, body.movietitle, body.moviegenre, body.moviedirector]);

            const response = {
                "message": `Updated movie (ID: ${body.movieid})`
            };
            
            return response;
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteMovie(movieID) {
    try {
        const idCheck = await idQuery(movieID);

        if(idCheck.rowCount === 0) {
            const response = {
                "message": "Movie does not exist"
            };
            
            return response;
        }
        else {
            await pool.query('DELETE FROM movies WHERE movie_id = $1', [movieID]);

            const response = {
                "message": `Deleted movie (old ID: ${movieID})`
            };
            
            return response;
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function idQuery(id) {
    try { 
        const check = await pool.query('SELECT * FROM movies WHERE movie_id = $1', [id]);
        return check;
    }
    catch (error) {
        console.log(error);
    }
}

async function insertQuery(body) {
    try {
        await pool.query(`INSERT INTO movies (movie_id, movie_title, movie_genre, movie_director)
        VALUES ($1, $2, $3, $4)`, [body.movieid, body.movietitle, body.moviegenre, body.moviedirector]);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllMovies,
    getMovieByID,
    getMovieByTitle,
    getMovieByGenre,
    getMovieByDirector,
    createNewMovie,
    updateOrCreateMovie,
    deleteMovie
};