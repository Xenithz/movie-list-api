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
});