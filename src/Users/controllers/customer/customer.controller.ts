import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/Users/dtos/customer.dto';
import { CustomerService } from 'src/Users/services/customer/customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Get()
    findAll() {
        return this.customerService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.customerService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateCustomerDto) {
        return this.customerService.create(payload);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: UpdateCustomerDto) {
        return this.customerService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.customerService.remove(id);
    }
}
