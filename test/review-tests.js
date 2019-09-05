const server = require('../server/index.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
const queries = require('../server/routes/review-queries');

chai.use(chaiHttp);

describe('Reviews', () => {
    beforeEach(async () => {
        await queries.clearTable();
    });
    
    describe('HTTP GET all reviews', () => {
        it('Should return all reviews inside the database (1)', async () => {
            await queries.insertIntoTable('12312312a', 'good movie', 10, 'chicken little', 'angelo guerrero');
            const res = await chai.request(server).get('/api/reviews');
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eql(1);
        });
    });

    describe('HTTP GET review by referal code', () => {
        it('Should return the review which corresponds with given referal code', async () => {
            await queries.insertIntoTable('12312312a', 'good movie', 10, 'chicken little', 'angelo guerrero');
            await queries.insertIntoTable('5424bsdf3', 'alright movie', 5, 'armageddon', 'bob guerrero');
            const res = await chai.request(server).get('/api/reviews').query('refcode=12312312a');
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eql(1);
            expect(res.body[0].ref_code).to.be.eql('12312312a');
        });
    });

    describe('HTTP GET reviews by reviewer', () => {
        it('Should return reviews written by specified reviewer', async () => {
            await queries.insertIntoTable('12312312a', 'good movie', 10, 'chicken little', 'angelo guerrero');
            await queries.insertIntoTable('5424bsdf3', 'alright movie', 5, 'armageddon', 'bob guerrero');
            const res = await chai.request(server).get('/api/reviews').query('reviewer=angelo guerrero');
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eql(1);
        });
    });

    describe('HTTP GET reviews by score', () => {
        it('Should return reviews that received specified score', async () => {
            await queries.insertIntoTable('12312312a', 'good movie', 10, 'chicken little', 'angelo guerrero');
            await queries.insertIntoTable('5424bsdf3', 'alright movie', 5, 'armageddon', 'bob guerrero');
            await queries.insertIntoTable('6576439ah', 'great movie', 10, 'lego movie', 'bob guerrero');
            const res = await chai.request(server).get('/api/reviews').query('score=10');
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eql(2);
        });
    });

    describe('HTTP GET reviews by movie name', () => {
        it('Should return reviews of specified movie name', async () => {
            await queries.insertIntoTable('12312312a', 'good movie', 10, 'chicken little', 'angelo guerrero');
            await queries.insertIntoTable('5424bsdf3', 'alright movie', 5, 'armageddon', 'bob guerrero');
            const res = await chai.request(server).get('/api/reviews').query('moviename=chicken little');
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eql(1);
        });
    });
});