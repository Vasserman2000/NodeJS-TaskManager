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