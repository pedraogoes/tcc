import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class chargeCreate1653605591644 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'charge',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isNullable: false,    
                    isUnique: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'driver',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'truck',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'freight_value',
                    type: 'numeric',
                    isNullable: true,
                    default: 0
                },
                {
                    name: 'status',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'business',
                    type: 'varchar',
                    isNullable: false,
                }, 
                {
                    name: 'cte_number',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'cte_attachment',
                    type: 'varchar',
                    isNullable: true,
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
        await queryRunner.dropTable('charge');
    }

}
