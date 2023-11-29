import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dtos/users.dto';
import { Users } from '../../entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
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
        throw new HttpException("El prod no existe", HttpStatus.BAD_REQUEST);
    }

    return user;
}


async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
}
}