import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/Products/Entities/products.entity';
import { CreateOrderItemDto, UpdateOrderItemDto } from 'src/Users/dtos/order-item.dto';
import { OrdersItems } from 'src/Users/entities/order-items.entity';
import { Orders } from 'src/Users/entities/orders.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemService {
    constructor(
        @InjectRepository(OrdersItems) private orderItemsRepository: Repository<OrdersItems>,
        @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
        @InjectRepository(Product) private productsRepository: Repository<Product>,
    ) {}

    async findAll() {
        const orderItems = await this.orderItemsRepository.find();
        if(!orderItems) {
            return 'No existen items';
        }
        return orderItems;
    }

    async findOne(id: number) {
        return await this.orderItemsRepository.findOneBy({id});
    }

    async create(data: CreateOrderItemDto) {
        //busco si existe la orden
        const order = await this.ordersRepository.findOne({where: {id: data.orderId}});
        if(!order) {
            return 'No existe la orden';
        }
        //busco si existe el producto
        const product = await this.productsRepository.findOne({where: {id: data.productId}});
        if(!product) {
            return 'No existe el producto';
        }
        //creo el item
        const newItem = this.orderItemsRepository.create({
            order,
            product,
            quantity: data.quantity
        });
        //guardo el item
        await this.orderItemsRepository.save(newItem);

        return {
            message: 'Item creado',
            newItem
        };
    }

    async update(id: number, changes: UpdateOrderItemDto) {
        return await this.orderItemsRepository.update(id, changes);
    }

    async remove(id: number) {
        return await this.orderItemsRepository.delete(id);
    }
}
