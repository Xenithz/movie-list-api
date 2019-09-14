const server = require('../server/index.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
const queries = require('../server/routes/review-queries');

const testMovieA = {
    refCode: "12312312a",
    review: "good movie",
    score: 10,
    movieName: "chicken little",
    reviewerName: "angelo guerrero"
};

const testMovieB = {
    refCode: "5424bsdf3",
    review: "alright movie",
    score: 5,
    movieName: "armageddon",
    reviewerName: "bob guerrero"
};

const testMovieC = {
    refCode: "6576439ah",
    review: "great movie",
    score: 10,
    movieName: "lego movie",
    reviewerName: "bob guerrero"
};

chai.use(chaiHttp);

describe('Reviews', () => {
    beforeEach(async () => {
        await queries.clearTable();
    });
    
    describe('HTTP GET all reviews', () => {
        it('Should return all reviews inside the database (1)', async () => {
            await queries.insertIntoTable(testMovieA);
            const res = await chai.request(server).get('/api/reviews');
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eql(1);
        });
    });

    describe('HTTP GET review by referal code', () => {
        it('Should return the review which corresponds with given referal code', async () => {
            await queries.insertIntoTable(testMovieA);
            const res = await chai.request(server).get('/api/reviews/12312312a')
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eql(1);
            expect(res.body[0].ref_code).to.be.eql('12312312a');
        });
    });

    describe('HTTP GET reviews by reviewer', () => {
        it('Should return reviews written by specified reviewer', async () => {
            await queries.insertIntoTable(testMovieA);
            await queries.insertIntoTable(testMovieB);
            const res = await chai.request(server).get('/api/reviews').query('reviewer=angelo guerrero');
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eql(1);
        });
    });

    describe('HTTP GET reviews by score', () => {
        it('Should return reviews that received specified score', async () => {
            await queries.insertIntoTable(testMovieA);
            await queries.insertIntoTable(testMovieB);
            await queries.insertIntoTable(testMovieC);
            const res = await chai.request(server).get('/api/reviews').query('score=10');
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eql(2);
        });
    });

    describe('HTTP GET reviews by movie name', () => {
        it('Should return reviews of specified movie name', async () => {
            await queries.insertIntoTable(testMovieA);
            await queries.insertIntoTable(testMovieB);
            const res = await chai.request(server).get('/api/reviews').query('moviename=chicken little');
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eql(1);
        });
    });

    describe('HTTP POST add a review', () => {
        it('Should return success message that review was added', async () => {
            const res = await chai.request(server).post('/api/reviews')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({refCode: '123a', review: "good movie", movieName: "chicken little", reviewerName: "angelo guerrero"})
            expect(res.body).to.be.a('object');
            expect(res.body.message).to.be.eql('Created new review (refCode: 123a)');
        });
    });

    describe('HTTP PUT update a review', () => {
        it('Should return success message that review was updated', async () => {
            await queries.insertIntoTable(testMovieA);
            const res = await chai.request(server).put('/api/reviews/12312312a')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({refCode: '123a', review: "good movie", movieName: "chicken little", reviewerName: "angelo guerrero"})
            expect(res.body).to.be.a('object');
            expect(res.body.message).to.be.eql('Updated review');
        });
    });

    describe('HTTP PUT create a review', () => {
        it('Should return success message that new review was inserted', async () => {
            const res = await chai.request(server).put('/api/reviews/12312312a')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({refCode: '123a', review: "good movie", movieName: "chicken little", reviewerName: "angelo guerrero"})
            expect(res.body).to.be.a('object');
            expect(res.body.message).to.be.eql('Created new review');
        });
    });

    describe('HTTP DELETE delete a review', () => {
        it('Should return success message that review was deleted', async () => {
            await queries.insertIntoTable(testMovieA);
            const res = await chai.request(server).delete('/api/reviews/12312312a');
            expect(res.body).to.be.a('object');
            expect(res.body.message).to.be.eql('Deleted movie');
            expect(res.body.id).to.be.eql('12312312a');
        });
    });
});