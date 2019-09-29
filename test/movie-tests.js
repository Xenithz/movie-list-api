const server = require('../server/index.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
const queries = require('../server/routes/movie-queries');

const testMovieA = {
    movieId: "213123",
    movieTitle: "chicken little",
    movieGenre: "animation",
    movieDirector: "mark dindal"
};

const testMovieB = {
    movieId: "2132141",
    movieTitle: "armageddon",
    movieGenre: "scifi",
    movieDirector: "michael bay"
};

const testMovieC = {
    movieId: "4123241312",
    movieTitle: "it",
    movieGenre: "horror",
    movieDirector: "andres muschietti"
};

chai.use(chaiHttp);

describe('Movies', () => {
    beforeEach(async () => {
        await queries.clearTable();
    });

    describe('HTTP GET all movies', () => {
        it('Should return all movies inside the database (1)', async () => {
            await queries.insertQuery(testMovieA)
            const res = await chai.request(server).get('/api/movies');
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eql(1);
            expect(res.body[0].movie_id).to.be.eql(213123);
        });
    });

    describe('HTTP GET movie by ID', () => {
        it('Should return the movie which corresponds with the given ID', async () => {
            await queries.insertQuery(testMovieA);
            const res = await chai.request(server).get('/api/movies/213123');
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eql(1);
            expect(res.body[0].movie_id).to.be.eql(213123);
        });
    });

    describe('HTTP GET movies by genre', () => {
        it('Should return the movies which correspond with the given genre', async () => {
            await queries.insertQuery(testMovieA);
            await queries.insertQuery(testMovieB);
            const res = await chai.request(server).get('/api/movies').query('genre=scifi');
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eql(1);
            expect(res.body[0].movie_id).to.be.eql(2132141);
        });
    });

    describe('HTTP GET movie by title', () => {
        it('Should return the movie which corresponds with the given title', async () => {
            await queries.insertQuery(testMovieA);
            await queries.insertQuery(testMovieB);
            const res = await chai.request(server).get('/api/movies').query('title=armageddon');
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eql(1);
            expect(res.body[0].movie_id).to.be.eql(2132141);
        });
    });

    describe('HTTP GET movie by director', () => {
        it('Should return the movies which correspond with the given director', async () => {
            await queries.insertQuery(testMovieA);
            await queries.insertQuery(testMovieB);
            const res = await chai.request(server).get('/api/movies').query('director=michael bay');
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eql(1);
            expect(res.body[0].movie_id).to.be.eql(2132141);
        });
    });

    describe('HTTP POST add a movie', () => {
        it('Should return success message that movie was added', async () => {
            const res = await chai.request(server).post('/api/movies')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({movieId: '213123', movieTitle: "chicken little", movieGenre: "animation", movieDirector: "mark dindal"});
            expect(res.body).to.be.a('object');
            expect(res.body.message).to.be.eql('Created new movie (ID: 213123)');
        });
    });

    describe('HTTP PUT update a movie', () => {
        it('Should return success message that movie was updated', async () => {
            await queries.insertQuery(testMovieA);
            const res = await chai.request(server).put('/api/movies/213123')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({movieId: '2131231', movieTitle: "chicken little", movieGenre: "animation", movieDirector: "mark dindal"});
            expect(res.body).to.be.a('object');
            expect(res.body.message).to.be.eql('Updated movie (ID: 2131231)');
        });
    });

    describe('HTTP PUT create a movie', () => {
        it('Should return success message that new movie was inserted', async () => {
            const res = await chai.request(server).put('/api/movies/2131231')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({movieId: '2131231', movieTitle: "chicken little", movieGenre: "animation", movieDirector: "mark dindal"});
            expect(res.body).to.be.a('object');
            expect(res.body.message).to.be.eql('Created new movie (ID: 2131231)');
        });
    });

    describe('HTTP DELETE delete a movie', () => {
        it('Should return success message that movie was deleted', async () => {
            await queries.insertQuery(testMovieA);
            const res = await chai.request(server).delete('/api/movies/213123');
            expect(res.body).to.be.a('object');
            expect(res.body.message).to.be.eql('Deleted movie (old ID: 213123)');
        });
    });
});