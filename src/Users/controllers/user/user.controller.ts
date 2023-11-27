import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/Users/dtos/users.dto';
import { UserService } from 'src/Users/services/user/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService ) {}

    //traer todos los usuarios
    @Get()
    getAllUsers() {
        return this.userService.findAll();
    }

    //traer un usuario
    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    //crear un usuario
    @Post()
    create(@Body() payload: CreateUserDto) {
        return this.userService.create(payload);
    }
}
