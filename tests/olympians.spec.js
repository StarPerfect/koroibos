var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('Test Olympians path', () => {
    describe('test GET Olympians', () => {
        it('happy path', async () => {
            const res = await request(app)
                .get('/api/v1/olympians');

            expect(res.statusCode).toBe(200);
            expect(res.body.olympians.length).toBe(3485);
            expect(res.body.olympians[0].name).toBe('Andreea Aanei');
            expect(res.body.olympians[0].age).toBe(22);
            expect(res.body.olympians[0].team).toBe('Romania');
            expect(res.body.olympians[0].sport).toBe('Weightlifting');
            expect(res.body.olympians[0].total_medals_won).toBe(0);
        });
    });
});