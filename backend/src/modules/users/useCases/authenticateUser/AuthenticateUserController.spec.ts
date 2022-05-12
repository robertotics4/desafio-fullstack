import { Connection } from 'typeorm';
import request from 'supertest';

import createConnection from '@shared/infra/typeorm';
import { app } from '@shared/infra/http/app';

let connection: Connection;

describe('Authenticate User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'password_test',
    });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to authenticate an user', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'johndoe@email.com',
      password: 'password_test',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
  });

  it('should  not be able to authenticate an user with incorrect email or password', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'johndoe@email.com',
      password: 'incorrect_password',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email or password incorrect');
  });
});
