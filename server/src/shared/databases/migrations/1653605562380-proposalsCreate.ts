import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class proposalsCreate1653605562380 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'proposals',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false,    
                    isUnique: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'charge_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'shipper',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'conveyor',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'value',
                    type: 'numeric',
                    isNullable: true,
                },
                {
                    name: 'business',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'status',
                    type: 'varchar',
                    isNullable: false,
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
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('proposals');
    }

}
