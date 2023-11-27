import { Injectable, NotFoundException } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { CreateUserDto } from 'src/Users/dtos/users.dto';
import { Users } from 'src/Users/entities/users.entity';

@Injectable()
export class UserService {
    constructor(
        
    ) {}

    //----declaro un array de users----------//
    private users: Users[] = [
        {
            id: 1,
            email: 'correo@mail.com',
            password: '12345',
            name: 'admin',
        },
    ];


    //traer todos los usuarios
    findAll() {
        return this.users;
    }

    //traer un usuario
    findOne(id: number) {
        const user = this.users.find((user) => user.id === id);
        if(!user) {
            return new NotFoundException(`User #${id} not found`);
        }
        return user;
    }

    //crear un usuario
    create(data: CreateUserDto) {
        //creo un nuevo usuario generando el ID y agregando los datos
        const newUser = {
            id: this.users.length + 1,
            ...data,
        };
        this.users.push(newUser);
        return newUser;
    };

    //actualizar un usuario
    update(id: number, changes: any) {
        //busco el usuario
        const user = this.findOne(id);
        //si el ususario no existe
        if(!user) {
            return new NotFoundException(`User #${id} not found`);
        }
        //busco el indice del usuario
        const index = this.users.findIndex((user) => user.id === id);
        this.users[index] = {
            ...user,
            ...changes,
        };
        return this.users[index];
    }

    //eliminar un usuario
    remove(id: number) {
        //busco el usuario
        const user = this.findOne(id);
        //si el ususario no existe
        if(!user) {
            return new NotFoundException(`User #${id} not found`);
        }
        //busco el indice del usuario
        const index = this.users.findIndex((user) => user.id === id);
        this.users.splice(index, 1);
        return true;
    }
}
