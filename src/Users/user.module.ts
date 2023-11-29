import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UsersController } from './controllers/user/user.controller';
import { UsersService } from './services/user/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}