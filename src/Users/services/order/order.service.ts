import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/Users/dtos/order.dto';
import { Customers } from 'src/Users/entities/customers.entity';
import { Orders } from 'src/Users/entities/orders.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
        @InjectRepository(Customers) private customersRepository: Repository<Customers>
    ) {}

    async findAll() {
        const orders = await this.ordersRepository.find();
        if(!orders) {
            return 'No existen ordenes';
        }
        return orders;
    }

    async findOne(id: number) {
        const order = await this.ordersRepository.findOne({where: {id}, relations: ['customer']});
        if(!order) {
            return 'No existe la orden';
        }
        return order;
    }

    //por ahora solo estoy creando la orden, no estoy creando los items
    async create(data: CreateOrderDto) {
        const newOrder = new Orders();
        //busco el cliente
        if(data.customerId) {
            const customer = await this.customersRepository.findOne({where: {id: data.customerId}});
            if(!customer) {
                return 'No existe el cliente';
            }
            newOrder.customer = customer;
        }
        await this.ordersRepository.save(newOrder);
        return {
            message: 'Orden creada',
            newOrder
        };
    }

    async update(id: number, changes: any) {
        const order = await this.ordersRepository.findOne({where: {id}});
        if(!order) {
            return 'No existe la orden';
        }
        this.ordersRepository.merge(order, changes);
        return this.ordersRepository.save(order);
    }

    async remove(id: string): Promise<void> {
        await this.ordersRepository.delete(id);
    }
}
