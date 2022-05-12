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

    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@email.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    await request(app)
      .post('/presentations')
      .send({
        name: 'Test Presentation',
        description: 'This is a test presentation',
        date: new Date(currentDate.setDate(currentDate.getDate() + 1)),
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .post('/presentations')
      .send({
        name: 'Test Presentation 2',
        description: 'This is a test presentation',
        date: new Date(currentDate.setDate(currentDate.getDate() + 2)),
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .post('/presentations')
      .send({
        name: 'Test Presentation 3 ',
        description: 'This is a test presentation',
        date: new Date(currentDate.setDate(currentDate.getDate() + 3)),
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list all presentations', async () => {
    const response = await request(app).get('/presentations');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });

  it('should be able to list presentations by name', async () => {
    const response = await request(app)
      .get('/presentations')
      .query({ name: 'Test Presentation 2' });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it('should be able to find presentations by date', async () => {
    currentDate = new Date();
    const threeDaysLater = new Date(
      currentDate.setDate(currentDate.getDate() + 3),
    );

    const response = await request(app)
      .get('/presentations')
      .query({ date: threeDaysLater });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
