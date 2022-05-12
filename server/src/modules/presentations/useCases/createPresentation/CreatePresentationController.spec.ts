import { Connection } from 'typeorm';
import request from 'supertest';
import { v4 as uuid } from 'uuid';

import createConnection from '@shared/infra/typeorm';
import { app } from '@shared/infra/http/app';
import { hash } from 'argon2';

let connection: Connection;
let currentDate: Date;

describe('Create Presentation Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('admin');

    await connection.query(
      `INSERT INTO USERS (id, name, email, password, is_admin, created_at, updated_at)
    VALUES ('${id}', 'admin', 'admin@email.com', '${password}', true, DATETIME('now'), DATETIME('now'))`,
    );

    currentDate = new Date();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new presentation', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@email.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/presentations')
      .send({
        name: 'Test Presentation',
        description: 'This is a test presentation',
        date: new Date(currentDate.setDate(currentDate.getDate() + 1)),
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test Presentation');
  });

  it('should not be able to create a new presentation with same date from another', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@email.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const date = new Date(currentDate.setDate(currentDate.getDate() + 2));

    await request(app)
      .post('/presentations')
      .send({
        name: 'Test Presentation 2',
        description: 'This is a test presentation',
        date,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .post('/presentations')
      .send({
        name: 'Test Presentation 3',
        description: 'This is a test presentation',
        date,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'There is another presentation on the same date',
    );
  });

  it('should not be able to create a new presentation with the date before the current', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@email.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    currentDate = new Date();

    const yesterday = new Date(currentDate.setDate(currentDate.getDate() - 1));

    const response = await request(app)
      .post('/presentations')
      .send({
        name: 'Test Presentation 4',
        description: 'This is a test presentation',
        date: yesterday,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid date');
  });
});
