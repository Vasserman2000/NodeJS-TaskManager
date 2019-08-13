const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task').Task;

const  { userOneId,
         userOne, 
         setupDatabase, 
         userTwo, 
         userTwoId, 
         taskOne, 
         taskTwo,
         taskThree  
    } = require('./fixtures/db')

beforeEach(setupDatabase);

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201);
        
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});


test('Should get all tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200);

    const tasks = await Task.find({owner: userOneId});
    expect(tasks.length).toEqual(2);
});


test('Should not delete not owned task', async() => {
    const response = await request(app)
        .delete(`/tasks/${taskThree._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .expect(404);

    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
});