import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class truckToBusiness1654039531027 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'truck_to_business',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isUnique: true,
                    isNullable: false,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'truck_plate',
                    type: 'varchar'
                },
                {
                    name: 'business_code',
                    type: 'varchar'
                }
            ]
        }));

        await queryRunner.createForeignKey('truck_to_business', new TableForeignKey({
            name: 'fk_truck_to_business_truck',
            columnNames: ['truck_plate'],
            referencedColumnNames: ['plate'],
            referencedTableName: 'truck'
        }));

        await queryRunner.createForeignKey('truck_to_business', new TableForeignKey({
            name: 'fk_truck_to_business_business',
            columnNames: ['business_code'],
            referencedColumnNames: ['code'],
            referencedTableName: 'business'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('truck_to_business', 'fk_truck_to_business_business');
        await queryRunner.dropForeignKey('truck_to_business', 'fk_truck_to_business_truck');
        await queryRunner.dropTable('truck_to_business')
    }

}
