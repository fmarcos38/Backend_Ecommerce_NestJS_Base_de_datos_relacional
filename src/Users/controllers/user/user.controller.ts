import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/Users/dtos/users.dto';
import { UserService } from 'src/Users/services/user/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService ) {}

    //traer todos los usuarios URL: --> http://localhost:3000/user/users
    @Get('/users')
    getAllUsers() {
        return this.userService.getUsers();
    }

    
}
