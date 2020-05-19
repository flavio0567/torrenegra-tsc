import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateProjects1589247443553 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'projects',
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
            name: 'code',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'hour_plc',
            type: 'int',
          },
          {
            name: 'hour_ihm',
            type: 'int',
          },
          {
            name: 'is_blocked',
            type: 'tinyint',
            default: 0,
          },
          {
            name: 'order_code',
            type: 'varchar',
            default: 0,
          },
          {
            name: 'order_value',
            type: 'decimal',
          },
          {
            name: 'status',
            type: 'tinyint',
          },
          {
            name: 'value_third_party',
            type: 'decimal',
          },
          {
            name: 'value_material',
            type: 'decimal',
          },
          {
            name: 'value_travel',
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
      'projects',
      new TableForeignKey({
        name: 'ProjectsClient',
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('projects', 'ProjectsClient');

    await queryRunner.dropTable('projects');
  }
}
