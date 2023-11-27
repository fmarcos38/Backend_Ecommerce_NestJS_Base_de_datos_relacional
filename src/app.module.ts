//importaciones de terceros PRIMERO
import { Module } from '@nestjs/common';

//importacioones de mi software SEGUNDO
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './Users/user.module';
import { DatabaseModule } from './Database/database.module';
import { DatabaseORMModule } from './Database/databaseORM.module';

@Module({
  imports: [UserModule, DatabaseModule, /* DatabaseORMModule */], //importo modulos que quiero que sean GLOBALES??
  controllers: [AppController], //importo controladores
  providers: [AppService], //importo servicios
})
export class AppModule {}
