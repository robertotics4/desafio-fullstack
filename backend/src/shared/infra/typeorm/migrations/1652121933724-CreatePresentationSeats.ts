import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePresentationSeats1652121933724
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'presentation_seats',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: true,
          },
          {
            name: 'presentationId',
            type: 'uuid',
          },
          {
            name: 'seatId',
            type: 'uuid',
          },
          {
            name: 'available',
            type: 'boolean',
            default: true,
          },
          {
            name: 'price',
            type: 'numeric',
            default: 27.99,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'presentation_seats',
      new TableForeignKey({
        name: 'FKPresentationSeat',
        referencedTableName: 'presentations',
        referencedColumnNames: ['id'],
        columnNames: ['presentationId'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'presentation_seats',
      new TableForeignKey({
        name: 'FKSeatPresentation',
        referencedTableName: 'seats',
        referencedColumnNames: ['id'],
        columnNames: ['seatId'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'presentation_seats',
      'FKSeatPresentation',
    );

    await queryRunner.dropForeignKey(
      'presentation_seats',
      'FKPresentationSeat',
    );

    await queryRunner.dropTable('presentation_seats');
  }
}
