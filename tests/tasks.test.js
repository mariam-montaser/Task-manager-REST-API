const request = require('supertest');

const app = require('../src/app');

const Task = require('../src/models/task');

const {
    dbSetup,
    userOne,
    userTwo,
    taskOne
} = require('./beforeTest/db');


beforeEach(dbSetup);

// beforeEach(async () => {
//     await dbSetup();
//     await jest.setTimeout(10000);

// });


test('Should create task for a user', async () => {
    // jest.setTimeout(10000);
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'New Task From my Test'
        })
        .expect(201);
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.complete).toEqual(false);
})

test('Should fetch user tasks', async () => {
    // jest.setTimeout(10000);
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    expect(response.body.length).toEqual(2)
})

test('Should not delete other users tasks', async () => {
    // jest.setTimeout(10000);
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
})


