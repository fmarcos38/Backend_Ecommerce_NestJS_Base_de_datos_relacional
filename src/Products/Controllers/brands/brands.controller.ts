import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/Products/Dtos/brands.dto';
import { BrandsService } from 'src/Products/Services/brands/brands.service';

@Controller('brands')
export class BrandsController {
    constructor(private brandService: BrandsService) {}

    @Get()
    findAll() {
        return this.brandService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.brandService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateBrandDto) {
        return this.brandService.create(payload);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: UpdateBrandDto) {
        return this.brandService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.brandService.remove(id);
    }
}
