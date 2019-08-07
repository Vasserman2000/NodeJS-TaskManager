const request = require('supertest');
const app = require('../src/app.js');

test('Should sign up a user', async () => {
    await request(app).post('/users').send({
        name: 'Elisha',
        email: 'elisha@gmail.com',
        password: 'MyPass777!',
        age: 19
    }).expect(201)
})