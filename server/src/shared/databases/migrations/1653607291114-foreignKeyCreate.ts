import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class foreignKeyCreate1653607291114 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('proposals', new TableForeignKey({
            name: 'fk_proposals_charge',
            columnNames: ['charge_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'charge'
        }));
        await queryRunner.createForeignKey('proposals', new TableForeignKey({
            name: 'fk_proposals_shipper',
            columnNames: ['shipper'],
            referencedColumnNames: ['code'],
            referencedTableName: 'business'
        }));
        await queryRunner.createForeignKey('proposals', new TableForeignKey({
            name: 'fk_proposals_conveyor',
            columnNames: ['conveyor'],
            referencedColumnNames: ['code'],
            referencedTableName: 'business'
        }));
        await queryRunner.createForeignKey('invoice_items', new TableForeignKey({
            name: 'fk_invoice_items',
            columnNames: ['invoice_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'invoice'
        }));
        await queryRunner.createForeignKey('invoice', new TableForeignKey({
            name: 'fk_invoice_shipper',
            columnNames: ['shipper'],
            referencedColumnNames: ['code'],
            referencedTableName: 'business'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('proposals', 'fk_proposals_charge');
        await queryRunner.dropForeignKey('proposals', 'fk_proposals_shipper');
        await queryRunner.dropForeignKey('proposals', 'fk_proposals_conveyor');
        await queryRunner.dropForeignKey('invoice_items', 'fk_invoice_items');
        await queryRunner.dropForeignKey('invoice', 'fk_invoice_shipper');
    }

}
