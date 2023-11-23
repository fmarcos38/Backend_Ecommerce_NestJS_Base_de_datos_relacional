import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';
import { TypeOrmModule } from '@nestjs/typeorm';


//modulo GLOBAL accesible para cualquiera
@Global()
@Module({
  //realizo conexion mediante ORM (como ES un MODULO --> hago la conexion en imports NO dentro de los PROVIDERS)
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY], //de aca vienen variab de entorno
      useFactory: (configService: ConfigType<typeof config>) => { //paso por param el arch config COMO siempre para la inyecc de depend
        //realizo la conexion async, y le paso las var de entorno YA sean para postgres o mysql
        const { 
          mysqlDB,
          mysqlUser,
          mysqlPassword,
          mysqlPort,
          mysqlHost 
        } = configService.mysql; //destructuring de las var en el arch config.ts para posgres

        return {
          type: 'mysql', //especifico a q tipo de DB es. (postgres o mysql)          
          host: mysqlHost,
          port: mysqlPort,
          username: mysqlUser,          
          password: mysqlPassword,
          database: mysqlDB,
          //SI VOY a utilizar la METODOLOGIA DE MIGRACIONES, el sgt parametro debe estar en FALSE
          synchronize: true, //con esta directiva ahogo q se sincronice al crear entidades Q se creen tablas en la DB
          autoLoadEntities: true, //le digo q las entidades sean autocargadas
        };
      }, 
    }),
  ],
  providers: [],
  exports: [TypeOrmModule], //aquí lo declaro para q sea accesible para otros modulos
})
export class DatabaseModule {}
