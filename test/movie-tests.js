const server = require('../server/index.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
const queries = require('../server/routes/movie-queries');

chai.use(chaiHttp);

describe('Movies', () => {
    beforeEach(async () => {
        await queries.clearTable();
    });

    describe('HTTP GET all movies', () => {
        it('Should return all movies inside the database (1)', async () => {
            await queries.insertIntoTable('12312312a', 'good movie', 10, 'chicken little', 'angelo guerrero');
            const res = await chai.request(server).get('/api/movies');
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eql(1);
        });
    });
});