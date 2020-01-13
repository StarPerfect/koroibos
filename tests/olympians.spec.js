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
            expect(res.body.olympians[0]).toHaveProperty('Name');
            expect(res.body.olympians[0]).toHaveProperty('Sex');
            expect(res.body.olympians[0]).toHaveProperty('Age');
            expect(res.body.olympians[0]).toHaveProperty('Height');
            expect(res.body.olympians[0]).toHaveProperty('Weight');
            expect(res.body.olympians[0]).toHaveProperty('Team');
            expect(res.body.olympians[0]).toHaveProperty('Games');
            expect(res.body.olympians[0]).toHaveProperty('Sport');
            expect(res.body.olympians[0]).toHaveProperty('Event');
            expect(res.body.olympians[0]).toHaveProperty('Medal');
            expect(res.body.olympians[0]['Name']).toBe('Andreea Aanei');
            expect(res.body.olympians[0]['Team']).toBe('Romania');
        });
    });
});