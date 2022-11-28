import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
    typename: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5455,
    database: 'postgres',
    username: 'postgres',
    password: 'postgres',
    entities: ['./src/modules/**/entities/*.{ts, js}'],
    migrations: ['./src/shared/database/migrations/*.{ts, js}'],
    synchronize: true
})
.initialize()
.then((response) => { 
    console.log('database connection') ;
    return response;
})
.catch((err) => { 
    console.error(err);
    throw new Error('Connection database error');
});