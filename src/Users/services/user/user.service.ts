import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Client } from 'pg';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { CreateUserDto } from 'src/Users/dtos/users.dto';
import { Users } from 'src/Users/entities/users.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('PG') private clientPG: Client
    ) {}

    //traer todos los usuarios
    //ejemplo de un servicio que retorna data traida de la base de datos
    //pero q no es asyncrono (no retorna una promesa) por eso no se usa await en el controlador 
    getUsers() {
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
