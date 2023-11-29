import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    ParseIntPipe,
} from '@nestjs/common';
import { Users } from '../../entities/users.entity';
import { UsersService } from '../../services/user/user.service';

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

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    }
}
