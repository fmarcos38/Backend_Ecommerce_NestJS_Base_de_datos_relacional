import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/Users/entities/orders.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(@InjectRepository(Orders) private ordersRepository: Repository<Orders>) {}

    async findAll() {
        if((await this.ordersRepository.find()).length == 0) {
            return 'No hay ordenes';
        }
        return this.ordersRepository.find();
    }

    async findOne(id: number) {
        const order = await this.ordersRepository.findOne({where: {id}});
        if(!order) {
            return 'No existe la orden';
        }
        return order;
    }

    async create(data: any) {
        const newOrder = this.ordersRepository.create(data);
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
