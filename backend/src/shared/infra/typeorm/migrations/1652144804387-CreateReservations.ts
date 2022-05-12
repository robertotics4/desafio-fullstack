import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateReservations1652144804387 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reservations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'presentationId',
            type: 'uuid',
          },
          {
            name: 'presentationSeatId',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'reservations',
      new TableForeignKey({
        name: 'FKReservationUser',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['userId'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'reservations',
      new TableForeignKey({
        name: 'FKReservationPresentation',
        referencedTableName: 'presentations',
        referencedColumnNames: ['id'],
        columnNames: ['presentationId'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'reservations',
      new TableForeignKey({
        name: 'FKReservationPresentationSeat',
        referencedTableName: 'presentation_seats',
        referencedColumnNames: ['id'],
        columnNames: ['presentationSeatId'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'reservations',
      'FKReservationPresentationSeat',
    );

    await queryRunner.dropForeignKey(
      'reservations',
      'FKReservationPresentation',
    );

    await queryRunner.dropForeignKey('reservations', 'FKReservationUser');

    await queryRunner.dropTable('reservations');
  }
}
