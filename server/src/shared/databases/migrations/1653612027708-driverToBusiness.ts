import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class driverToBusiness1653612027708 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'driver_to_business',
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
                    name: 'driver',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'business',
                    type: 'varchar',
                    isNullable: false
                }
            ]
        }));

        await queryRunner.createForeignKey('driver_to_business', new TableForeignKey({
            name: 'fk_driver_to_business_driver',
            columnNames: ['driver'],
            referencedColumnNames: ['num_doc'],
            referencedTableName: 'driver'
        }));

        await queryRunner.createForeignKey('driver_to_business', new TableForeignKey({
            name: 'fk_driver_to_business_business',
            columnNames: ['business'],
            referencedColumnNames: ['code'],
            referencedTableName: 'business'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('driver_to_business', 'fk_driver_to_business_business');
        await queryRunner.dropForeignKey('driver_to_business', 'fk_driver_to_business_driver');
        await queryRunner.dropTable('driver_to_business');
    }

}
