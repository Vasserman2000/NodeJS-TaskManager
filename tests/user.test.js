const request = require('supertest');
const app = require('../src/app.js');
const User = require('../src/models/user').User;

const userOne = {
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    age: 20
}

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});


test('Should sign up a user', async () => {
    await request(app).post('/users').send({
        name: 'Elisha',
        email: 'elisha@gmail.com',
        password: 'MyPass777!',
        age: 19
    }).expect(201)
})

test('Should log in existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
});

test('Should not login nonexisted user', async () => {
    await request(app).post('/users/login').send({
        email: 'Aaa@aaa.com',
        password: '1234555'
    }).expect(400)
});


test('Should update user profiel', async () => {
    await request(app).patch('/users/me').send({
        age: 30
    }).expect(200)
})