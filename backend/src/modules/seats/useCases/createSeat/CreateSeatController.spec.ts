import { Connection } from 'typeorm';
import request from 'supertest';
import { v4 as uuid } from 'uuid';

import createConnection from '@shared/infra/typeorm';
import { app } from '@shared/infra/http/app';
import { hash } from 'argon2';

let connection: Connection;

describe('Create Seat Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('admin');

    await connection.query(
      `INSERT INTO USERS (id, name, email, password, is_admin, created_at, updated_at)
    VALUES ('${id}', 'admin', 'admin@email.com', '${password}', true, DATETIME('now'), DATETIME('now'))`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new seat', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@email.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/seats')
      .send({
        row: 'A',
        num: 1,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
