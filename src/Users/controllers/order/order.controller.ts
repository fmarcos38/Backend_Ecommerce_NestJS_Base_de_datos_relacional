import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from 'src/Users/dtos/order.dto';
import { OrderService } from 'src/Users/services/order/order.service';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get()
    findAll() {
        return this.orderService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.orderService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateOrderDto) {
        return this.orderService.create(payload);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: UpdateOrderDto) {
        return this.orderService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orderService.remove(id);
    }
}
