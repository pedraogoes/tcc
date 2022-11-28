import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class driverCreate1653349144137 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'driver',
            columns: [
                {
                    name: 'num_doc',
                    type: 'varchar',
                    isUnique: true,
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: 'validy_doc',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'status',
                    type: 'boolean',
                    isNullable: false,
                    default: 'true'
                },  
                {
                    name: 'attachment',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('driver');
    }

}
