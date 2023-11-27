import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(@Inject('PG') private clientPG: Client) {}

  getHello(): string {
    return 'Hello World!';
  }

  //ejemplo de un servicio que retorna data traida de la base de datos
  //pero q no es asyncrono (no retorna una promesa) por eso no se usa await en el controlador 
  getAllUsers() {
    return new Promise((resolve, reject) => {
      this.clientPG.query('SELECT * FROM users', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
