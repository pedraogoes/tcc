import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class businessCreate1653605526434 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'business',
            columns: [
                {
                    name: 'code',
                    type: 'varchar',
                    isPrimary: true,
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'type',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'certificate',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'cert_attachment',
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
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('business');
    }

}
