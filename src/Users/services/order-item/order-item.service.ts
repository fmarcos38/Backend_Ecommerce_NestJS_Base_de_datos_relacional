import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderItemDto, UpdateOrderItemDto } from 'src/Users/dtos/order-item.dto';
import { OrdersItems } from 'src/Users/entities/order-items.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemService {
    constructor(@InjectRepository(OrdersItems) private orderItemsRepository: Repository<OrdersItems>) {}

    async findAll() {
        return await this.orderItemsRepository.find();
    }

    async findOne(id: number) {
        return await this.orderItemsRepository.findOneBy({id});
    }

    async create(data: CreateOrderItemDto) {
        return await this.orderItemsRepository.save(data);
    }

    async update(id: number, changes: UpdateOrderItemDto) {
        return await this.orderItemsRepository.update(id, changes);
    }

    async remove(id: number) {
        return await this.orderItemsRepository.delete(id);
    }
}
