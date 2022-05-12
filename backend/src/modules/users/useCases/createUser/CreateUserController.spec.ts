import { Connection } from 'typeorm';
import request from 'supertest';

import createConnection from '@shared/infra/typeorm';
import { app } from '@shared/infra/http/app';

let connection: Connection;

describe('Create User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'password_test',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'password_test',
    });

    const response = await request(app).post('/users').send({
      name: 'John Doe 2',
      email: 'johndoe@email.com',
      password: 'password_test',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists');
  });
});
