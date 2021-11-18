const request = require('supertest');

const app = require('../src/app');

const User = require('../src/models/user');

const {
    dbSetup,
    userOneId,
    userOne
} = require('./beforeTest/db');

beforeEach(dbSetup);

// beforeEach(async () => {
//     await dbSetup();
//     await jest.setTimeout(10000);

// });

test('should register a new user', async () => {
    // jest.setTimeout(10000);
    const response = await request(app)
        .post('/users')
        .send({
            email: 'newuser@example.com',
            password: '55555'
        })
        .expect(201);
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();
    expect(response.body).toMatchObject({
        user: {
            email: 'newuser@example.com'
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe('55555');
})


test('should\'t register an existing user', async () => {
    // jest.setTimeout(10000);
    await request(app)
        .post('/users')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(400);
})

test('Should login existing user', async() => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200);
    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
})

test('Shouldn\'t login none exsiting user.', async () => {
    jest.setTimeout(10000);
    await request(app)
        .post('/users/login')
        .send({
            email: 'nonExistUser@example.com',
            password: 'qwerty'
        })
        .expect(400);
})


test('Shouldn\'t login exsiting user with wrong password.', async () => {
    jest.setTimeout(10000);
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: 'wrongPassword'
        })
        .expect(400);
})
