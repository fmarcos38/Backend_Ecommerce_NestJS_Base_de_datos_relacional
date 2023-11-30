import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateOrderItemDto, UpdateOrderItemDto } from 'src/Users/dtos/order-item.dto';
import { OrderItemService } from 'src/Users/services/order-item/order-item.service';

@Controller('order-items')
export class OrderItemsController {
    constructor(private orderItemsService: OrderItemService) {}

    @Get()
    async findAll() {
        return await this.orderItemsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number ) {
        return await this.orderItemsService.findOne(1);
    }

    @Post()
    async create(@Body() data: CreateOrderItemDto) {        
        return await this.orderItemsService.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() changes: UpdateOrderItemDto) {
        return await this.orderItemsService.update(id, changes);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return await this.orderItemsService.remove(id);
    }
}
