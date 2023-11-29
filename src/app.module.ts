//importaciones de terceros PRIMERO
import { Module } from '@nestjs/common';

//importacioones de mi software SEGUNDO
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Users/user.module';
import { DatabaseModule } from './Database/database.module';
import { DatabaseORMModule } from './Database/databaseORM.module';
import { DatabaseVariablesModule } from './Database/databaseVariables.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './Users/entities/users.entity';
import { join } from 'path';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'root',
      password: '123456',
      database: 'my_db',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
      }),
    }),
    UsersModule
  ], //importo modulos que quiero que sean GLOBALES??
  controllers: [AppController], //importo controladores
  providers: [AppService], //importo servicios
})
export class AppModule {}
