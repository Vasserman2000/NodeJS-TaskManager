const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app.js');
const User = require('../src/models/user').User;

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    age: 21,
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }],
}


beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});


test('Should sign up a user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Elisha',
        email: 'elisha@gmail.com',
        password: 'MyPass777!',
        age: 19
    }).expect(201);

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Elisha',
            email: 'elisha@gmail.com'
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe('MyPass777!'); 
});


test('Should log in existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
});


test('Should not login nonexisted user', async () => {
    await request(app).post('/users/login').send({
        email: 'Aaa@aaa.com',
        password: '1234555'
    }).expect(400);
});


test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});


test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});


test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user)
        .toBeNull();
});


test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});


test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('myAvatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200);
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});


test('Should update valid user fields', async () => {
    const newName = 'Roboto';
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: newName
        })
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.name).toEqual(newName);
});


test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'New York'
        })
        .expect(400);
});