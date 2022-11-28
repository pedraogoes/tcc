import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class invoiceCreate1656630170662 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'invoice',
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
                    name: 'nfe_number',
                    type: 'numeric',
                    isNullable: false,
                },
                {
                    name: 'nfe_gross_weight',
                    type: 'numeric',
                    isNullable: false,
                },
                {
                    name: 'nfe_net_weight',
                    type: 'numeric',
                    isNullable: false,
                },
                {
                    name: 'need_date',
                    type: 'timestamp',
                    isNullable: false,
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
                    name: 'shipper',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'conveyor',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'boarding',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'boarding_detail',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'landing',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'landing_detail',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'nfe_attachment',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'charge',
                    type: 'varchar',
                    isNullable: true,
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
        await queryRunner.dropTable('invoice');
    }

}
