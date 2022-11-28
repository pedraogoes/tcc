import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class invoiceItemsCreate1656630162001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'invoice_items',
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
                    name: 'invoice_id',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'value',
                    type: 'numeric',
                    isNullable: false,
                },
                {
                    name: 'gross_weight',
                    type: 'numeric',
                    isNullable: true,
                },
                {
                    name: 'net_weight',
                    type: 'varchar',
                    isNullable: true,
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('invoice_items');
    }

}
