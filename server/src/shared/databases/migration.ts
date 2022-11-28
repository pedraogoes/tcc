import { DataSource } from 'typeorm';
import pg from 'pg'

export const dataSource = new DataSource({
    typename: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5455,
    database: 'postgres',
    username: 'postgres',
    password: 'postgres',
    entities: ['./src/modules/**/entities/*.ts'],
    migrations: ['./src/shared/database/migrations/*.ts'],
    driver: pg,
    logging: true
})