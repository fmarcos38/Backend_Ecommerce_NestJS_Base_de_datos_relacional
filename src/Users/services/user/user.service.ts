import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../../dtos/users.dto';
import { Users } from '../../entities/users.entity';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
        private costumerService: CustomerService, //me traigo los metodos de customer.service.ts
    ) {}

    async findAll() {
        const users = await this.usersRepository.find();
        if(users[0] == null) {
            return 'No hay usuarios';
        }
        return users;
    }

    async findOne(id: number) {
        const user = await this.usersRepository.findOneBy({id});

        if(!user) {
            throw new HttpException("El user no existe", HttpStatus.BAD_REQUEST);
        }

        return user;
    }

    async create(data: CreateUserDto) {
        //busco si el user ya existe
        const buscoUser = await this.usersRepository.findOne({where: {email: data.email}});
        if(buscoUser) {
            throw new HttpException("El user ya existe", HttpStatus.BAD_REQUEST);
        }
        //lo creo PERO sin el customerId
        let newUser = this.usersRepository.create(data);
        //pregunto si viene el customerId
        if(data.customerId) {
            //busco si el customerId ya existe
            const customer = await this.costumerService.findOne(data.customerId);
            if(customer == null) {
                throw new HttpException("El customer no existe", HttpStatus.BAD_REQUEST);
            }
            //si existe, le creo al newUser el customerId
            newUser.customer = customer;
        }
        //guardo los cambios 
        await this.usersRepository.save(newUser);
        return {
            message: 'Usuario creado',
            newUser
        };
    }

    async update(id: number, changes: UpdateUserDto) {
        const user = await this.usersRepository.findOneBy({id});
        if(!user) {
            throw new HttpException("El user no existe", HttpStatus.BAD_REQUEST);
        }
        this.usersRepository.merge(user, changes);
        return this.usersRepository.save(user);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}

/*
{
    "id": 2,
    "email": "jose@dd.com",
    "password": 321,
    "role": "client"
}
*/