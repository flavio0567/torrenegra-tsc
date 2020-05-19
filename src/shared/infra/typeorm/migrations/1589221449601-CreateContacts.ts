import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateContacts1589221449601 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contacts',
        columns: [
          {
            name: 'id',
            type: 'uniqueidentifier',
            isPrimary: true,
            default: 'newid()',
          },
          {
            name: 'client_id',
            type: 'uniqueidentifier',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'bigint',
          },
          {
            name: 'other',
            type: 'varchar',
          },
          {
            name: 'main_contact',
            type: 'tinyint',
            default: 0,
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
      'contacts',
      new TableForeignKey({
        name: 'ContactClient',
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('contacts', 'ContactClient');

    await queryRunner.dropTable('contacts');
  }
}
