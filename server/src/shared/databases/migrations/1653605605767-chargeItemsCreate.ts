import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class chargeItemsCreate1653605605767 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'charge_items',
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
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'invoice_id',
                    type: 'varchar',
                    isNullable: false,
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('charge_items');
    }

}
