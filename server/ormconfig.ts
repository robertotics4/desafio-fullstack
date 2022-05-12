export default {
  type: 'sqlite',
  database:
    process.env.NODE_ENV === 'test'
      ? ':memory:'
      : `./${process.env.DB_PATH}/${process.env.DB_NAME}`,
  dropSchema: process.env.NODE_ENV === 'test',
  // autoSchemaSync: true,
  logging: false,
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  entities: ['./src/modules/**/entities/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};
