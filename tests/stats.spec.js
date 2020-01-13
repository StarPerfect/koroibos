var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

describe('Test Olympian Stats path', () => {
    describe('test GET Stats', () => {
        it('happy path', async () => {
            const res = await request(app)
                .get('/api/v1/olympian_stats');

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('olympian_stats');
            expect(res.body.olympian_stats).toHaveProperty('total_competing_olympians');
            expect(res.body.olympian_stats).toHaveProperty('average_weight');
            expect(res.body.olympian_stats).toHaveProperty('average_age');
            expect(res.body.olympian_stats.average_weight).toHaveProperty('unit');
            expect(res.body.olympian_stats.average_weight).toHaveProperty('male_olympians');
            expect(res.body.olympian_stats.average_weight).toHaveProperty('female_olympians');
        })
    })
});