import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UsersController } from './controllers/user/user.controller';
import { UsersService } from './services/user/user.service';
import { CustomerController } from './controllers/customer/customer.controller';
import { Customers } from './entities/customers.entity';
import { CustomerService } from './services/customer/customer.service';
import { OrderService } from './services/order/order.service';
import { OrderController } from './controllers/order/order.controller';
import { Orders } from './entities/orders.entity';
import { OrderItemsController } from './controllers/order-items/order-items.controller';
import { OrdersItems } from './entities/order-items.entity';
import { OrderItemService } from './services/order-item/order-item.service';

@Module({
    imports: [TypeOrmModule.forFeature([Users, Customers, Orders, OrdersItems])],//importo modulos q utilizaré (productsModule[lo usaré para las relaciones])
    providers: [UsersService, CustomerService, OrderService, OrderItemService],
    controllers: [UsersController, CustomerController, OrderController, OrderItemsController],
})
export class UsersModule {}