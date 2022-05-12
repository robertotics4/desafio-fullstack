import { v4 as uuidv4 } from 'uuid';
import { hash } from 'argon2';

import createConnection from '../../../../../shared/infra/typeorm/index';

async function createTest() {
  const connection = await createConnection();

  const id = uuidv4();
  const password = await hash('test');

  await connection.query(
    `INSERT INTO USERS (id, name, email, password, is_admin, created_at, updated_at)
    VALUES ('${id}', 'teste', 'test@email.com', '${password}', false, DATETIME('now'), DATETIME('now'))`,
  );

  await connection.close();
}

createTest().then(() => console.log('User teste created!'));

export { createTest };
