//importaciones de terceros PRIMERO
import { Module } from '@nestjs/common';

//importacioones de mi software SEGUNDO
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ProductsModule } from './Products/products.module';

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
    UsersModule,
    ProductsModule,
  ], //importo modulos que quiero que sean GLOBALES??
  controllers: [AppController], //importo controladores
  providers: [AppService] //importo servicios
})
export class AppModule {}
