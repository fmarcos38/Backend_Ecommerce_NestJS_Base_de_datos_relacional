import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    ParseIntPipe,
    Put,
} from '@nestjs/common';
import { Users } from '../../entities/users.entity';
import { UsersService } from '../../services/user/user.service';
import { CreateUserDto, UpdateUserDto } from 'src/Users/dtos/users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Users> {
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateUserDto) {
        return this.usersService.create(payload);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: UpdateUserDto) {
        return this.usersService.update(id, payload);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    }
}
