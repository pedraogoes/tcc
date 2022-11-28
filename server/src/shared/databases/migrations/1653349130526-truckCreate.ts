import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class truckCreate1653349130526 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'truck',
            columns: [
                {
                    name: 'plate',
                    type: 'varchar',
                    isPrimary: true,
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'model',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'brand',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'type',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'weight',
                    type: 'numeric',
                    isNullable: true
                },
                {
                    name: 'capacity',
                    type: 'numeric',
                    isNullable: true
                },
                {
                    name: 'status',
                    type: 'boolean',
                    isNullable: false,
                    default: 'true'
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
        await queryRunner.dropTable('truck');
    }

}
