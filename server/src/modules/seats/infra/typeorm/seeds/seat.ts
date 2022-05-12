import { v4 as uuidv4 } from 'uuid';

import createConnection from '../../../../../shared/infra/typeorm/index';

async function seedSeat(id: string, row: string, num: number) {
  const connection = await createConnection();

  await connection.query(
    `INSERT INTO SEATS (id, row, num, created_at)
    VALUES ('${id}', '${row}', ${num}, DATETIME('now'))`,
  );

  await connection.close();
}

async function createSeats() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const alphabetArray = alphabet.split('');

  for (let i = 0; i < 10; i += 1) {
    for (let j = 1; j < 11; j += 1) {
      seedSeat(uuidv4(), alphabetArray[i].toUpperCase(), j);
    }
  }
}

createSeats().then(() => console.log('Seats created!'));

export { createSeats };
