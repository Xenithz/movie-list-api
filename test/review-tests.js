const server = require('../server/index.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const queries = require('../server/routes/review-queries');

chai.use(chaiHttp);

describe('Reviews', () => {
    beforeEach(async () => {
        await queries.clearTable();
    });
    
    describe('HTTP GET reviews', () => {
        it('Should return 1 inserted review', async () => {
            await queries.insertIntoTable('12312312a', 'good movie', 10, 'chicken little', 'angelo guerrero');
            chai.request(server)
                .get('/api/reviews')
                .end((err, res) => {
                    res.body.should.be.an('array');
                    res.body.length.should.be.eql(1);
            });
        });
    });
});