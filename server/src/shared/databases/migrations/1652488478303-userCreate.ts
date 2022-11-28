import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class userCreate1652488478303 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user',
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
                    name: 'name',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'type',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'business_code',
                    type: 'varchar',
                    isNullable: true
                }, 
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'actived',
                    type: 'boolean',
                    isNullable: false,
                    default: 'false'
                },
                {
                    name: 'token',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'token_validity',
                    type: 'varchar'
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
        await queryRunner.dropTable('user');
    }

}
