import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();


export const AppDataSource = new DataSource({
    type: 'mysql', //especifico a q tipo de DB es. (postgres o mysql)  
    url: process.env.DATABASE_URL, //url de conexion a la DB
    //SI VOY a utilizar la METODOLOGIA DE MIGRACIONES, el sgt parametro debe estar en FALSE
    synchronize: true, //con esta directiva ahogo q se sincronice al crear entidades Q se creen tablas en la DB
    logging: false, //para q no muestre los logs en consola
    entities: ['src/**/*.entitiy.ts'], //le digo q las entidades sean autocargadas
    migrations: ['src/database/migrations/*.ts'], //le digo q las migraciones sean autocargadas
    migrationsTableName: 'migrations', //nombre de la tabla de migraciones
})