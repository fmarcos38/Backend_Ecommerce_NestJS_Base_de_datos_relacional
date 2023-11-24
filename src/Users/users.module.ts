import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Customers } from './entities/customers.entity';
import { OrdersItems } from './entities/order-items.entity';
import { Orders } from './entities/orders.entity';

@Module({
    //en este modulo importamos los modulos que necesitamos (por ejem Products.module, TypeOrmModule, etc)
    imports:[], 
    controllers: [],
    providers: [],
})
export class UsersModule {}
