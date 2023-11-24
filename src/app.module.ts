import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
/* import { UserService } from './users/services/user/user.service';
import { CustomerService } from './users/services/customer/customer.service';
import { OrderService } from './users/services/order/order.service';
import { OrderItemService } from './users/services/order-item/order-item.service'; */
import { UsersModule } from './Users/users.module';
import config from './config';
import * as Joi from "@hapi/joi";

@Module({
  //en este punto se declaran Modulos ESPECIFICOS(products, users)
  imports: [  
    //config para las variables de entorno
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env', //si por consola NO elijo ambiente entoncs va con las del arch .env
      isGlobal: true, //para q las variables de entorno sean globales
      load: [config], //para q lea el archivo config.ts
      //validacion/tipado de las variables de entorno
      validationSchema: Joi.object({
        //para MySQL
        MYSQL_DB: Joi.string().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_ROOT_PASSWORD: Joi.string().required(),
        MYSQL_PORT: Joi.number().default(3306),
        MYSQL_HOST: Joi.string().required(),
      }),
    }), UsersModule,
    //modulos de la app
  ],
  //en este punto SE declaron los CONTOLADORES  
  controllers: [AppController],
  //en este punto SE declaron los SERVICIOS, [los q son una clase usan useClass, los q son valores usan useValue]
  //tambien declaracion de un provide asyn y q recibe inyeccion de dependencias, esto va a ser un array de tareas q me traigo de una api externa.
  providers: [AppService],
})
export class AppModule {}
