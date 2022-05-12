import { v4 as uuidv4 } from 'uuid';
import { hash } from 'argon2';

import createConnection from '../../../../../shared/infra/typeorm/index';

async function createAdmin() {
  const connection = await createConnection();

  const id = uuidv4();
  const password = await hash('admin');

  await connection.query(
    `INSERT INTO USERS (id, name, email, password, is_admin, created_at, updated_at)
    VALUES ('${id}', 'admin', 'admin@email.com', '${password}', true, DATETIME('now'), DATETIME('now'))`,
  );

  await connection.close();
}

createAdmin().then(() => console.log('User admin created!'));

export { createAdmin };
