import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAppointments1589248231342
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uniqueidentifier',
            isPrimary: true,
            default: 'newid()',
          },
          {
            name: 'provider_id',
            type: 'uniqueidentifier',
          },
          {
            name: 'project_id',
            type: 'uniqueidentifier',
          },
          {
            name: 'expense_amount',
            type: 'decimal',
          },
          {
            name: 'expense_date',
            type: 'datetime2',
          },
          {
            name: 'expense_description',
            type: 'varchar',
          },
          {
            name: 'expense_is_holiday',
            type: 'tinyint',
            default: 0,
          },
          {
            name: 'expense_is_refundable',
            type: 'tinyint',
            default: 0,
          },
          {
            name: 'end_date',
            type: 'datetime2',
          },
          {
            name: 'start_date',
            type: 'datetime2',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'hourly_value',
            type: 'decimal',
          },
          {
            name: 'created_at',
            type: 'datetime2',
            default: 'sysdatetime()',
          },
          {
            name: 'updated_at',
            type: 'datetime2',
            default: 'sysdatetime()',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentUser',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProject',
        columnNames: ['project_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projects',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentUser');

    await queryRunner.dropForeignKey('appointments', 'AppointmentProject');

    await queryRunner.dropTable('appointments');
  }
}
