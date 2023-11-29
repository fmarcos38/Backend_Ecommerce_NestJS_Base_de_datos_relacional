import { Module, Global } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';

/*
POSTGRES_DB
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_PORT
POSTGRES_HOST
*/

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '123456',
                database: 'my_db',
                entities: [],
                synchronize: true,
            }),            
            dataSourceFactory: async (options) => {
                const dataSource = await new DataSource(options).initialize();
                return dataSource;
            }
        }),
    ],
    exports: [TypeOrmModule],

})
export class DatabaseORMModule {}