import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1589247270666 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uniqueidentifier',
            isPrimary: true,
            default: 'newid()',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'first_name',
            type: 'varchar',
          },
          {
            name: 'hourly_cost',
            type: 'decimal',
          },
          {
            name: 'is_admin',
            type: 'tinyint',
            default: 0,
          },
          {
            name: 'is_active',
            type: 'tinyint',
            default: 0,
          },
          {
            name: 'last_name',
            type: 'varchar',
          },
          {
            name: 'password_hash',
            type: 'varchar',
          },
          {
            name: 'position',
            type: 'varchar',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
