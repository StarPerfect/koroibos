var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

describe('Test Events Path', () => {
    it('events happy path', async () => {
        const res = await request(app)
            .get('/api/v1/events');

        expect(res.statusCode).toBe(200);
        expect(res.body[0]).toHaveProperty('events')
        expect(res.body[0]).toHaveProperty('sport')
        expect(res.body[0]).toHaveProperty('events')
        expect(res.body[0].events[0]).toHaveProperty('Event')
    })
})