//importaciones de terceros PRIMERO
import { Module } from '@nestjs/common';

//importacioones de mi software SEGUNDO
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './Users/user.module';
import { DatabaseModule } from './Database/database.module';

@Module({
  imports: [UserModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
