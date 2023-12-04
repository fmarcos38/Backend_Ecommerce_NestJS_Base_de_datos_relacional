import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/Products/Dtos/products.dto';
import { ProductsService } from 'src/Products/Services/products/products.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductsService) {}

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.productService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateProductDto) {
        return this.productService.create(payload);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
        return this.productService.update(id, payload);
    }

    //endpoint elimina categoria de un producto
    @Delete(':productId/category/:categoryId')
    removeCategory(@Param('productId', ParseIntPipe) productId: number, @Param('categoryId', ParseIntPipe) categoryId: number) {
        return this.productService.removeCategoryOfProduct(productId, categoryId);
    }
    
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.productService.remove(id);
    }
}
