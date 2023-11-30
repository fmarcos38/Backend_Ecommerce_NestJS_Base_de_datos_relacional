import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/Products/Dtos/categories.dto';
import { CategoriesService } from 'src/products/services/categories/categories.service';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoriesService) {}

    @Get()
    getCategories() {
        return this.categoryService.findAll();
    }

    @Get(':id')
    getCategory(@Param('id') id: number) {
        return this.categoryService.findOne(id);
    }

    @Post()
    createCategory(@Body() payload: CreateCategoryDto) {
        return this.categoryService.create(payload);
    }

    @Put(':id')
    updateCategory(@Param('id') id: number, @Body() payload: UpdateCategoryDto) {
        return this.categoryService.update(id, payload);
    }

    @Delete(':id')
    deleteCategory(@Param('id') id: number) {
        return this.categoryService.remove(id);
    }
}
