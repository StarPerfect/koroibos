var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

describe('Test Events Path', () => {
    describe('Testing Events Controller', () => {
        it('events happy path', async () => {
            const res = await request(app)
                .get('/api/v1/events');

            expect(res.statusCode).toBe(200);
            expect(res.body[0]).toHaveProperty('events')
            expect(res.body[0]).toHaveProperty('sport')
            expect(res.body[0]).toHaveProperty('events')
            expect(res.body[0].events[0]).toHaveProperty('Event')
        })
    });

        it('Medalists happy path', async () => {
            const res = await request(app)
                .get('/api/v1/events/119/medalists');

            expect(res.statusCode).toBe(200);
            expect(res.body.events).toBe('Badminton Mixed Doubles');
            expect(res.body.medalists.length).toBe(2);
            expect(res.body.medalists[0]['Name']).toBe('Tontowi Ahmad');
            expect(res.body.medalists[0]['Team']).toBe('Indonesia-1');
            expect(res.body.medalists[0]['Age']).toBe(29);
            expect(res.body.medalists[0]['Medal']).toBe('Gold');
    });

    it('Medalists sad path', async () => {
        const res = await request(app)
            .get('/api/v1/events/9999/medalists');
        
        expect(res.statusCode).toBe(400);
    });
});