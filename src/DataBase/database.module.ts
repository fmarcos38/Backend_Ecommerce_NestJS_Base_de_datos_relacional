import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

//----conexion con la base de datos --------//
const client = new Client({ 
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: '123456',
  port: 5433,
});

client.connect();

//acá ya podríamos hacer consultas a la base de datos	mediante queries
//ejemplo
/* client.query('SELECT * FROM users', (err, res) => {
  console.error(err);
  console.log(res.rows);
}); */

//al implementar la conexion de forma global, ya no es necesario importarla en cada modulo, NI usar el query anterior
//cada servicio realizará sus consultas a la base de datos de forma independiente
@Global()
@Module({
  providers: [
    {
      provide: 'PG',
      useValue: client, //lo paso con useValue por es un objeto(no es async)
    },
  ],
  exports: ['PG'],
})
export class DatabaseModule {}