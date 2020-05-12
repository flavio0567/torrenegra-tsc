import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateClients1589215968837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clients',
        columns: [
          {
            name: 'id',
            type: 'uniqueidentifier',
            isPrimary: true,
            default: 'newid()',
          },
          {
            name: 'cnpj',
            type: 'varchar',
          },
          {
            name: 'corporate_name',
            type: 'varchar',
          },
          {
            name: 'trading_name',
            type: 'varchar',
          },
          {
            name: 'hourly_cost',
            type: 'decimal',
            default: 0,
          },
          {
            name: 'payment_deadline',
            type: 'int',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients');
  }
}
