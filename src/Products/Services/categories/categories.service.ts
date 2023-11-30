import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/Products/Entities/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

    async findAll(){
        if(!(await this.categoryRepository.find())){
            return "No categories found";
        }
        return this.categoryRepository.find();
    }

    async findOne(id: number){
        const category = await this.categoryRepository.findOne({ where: { id } });
        if(!category){
            return "Category not found";
        }
        return category;
    }

    async create(data: any){
        const buscaCat = this.categoryRepository.findOne({ where: { name: data.name } });
        if(!buscaCat){
            return "Category already exists";
        }
        const newCategory = this.categoryRepository.create(data);
        await this.categoryRepository.save(newCategory);
        return {
            message: "Category created",
            newCategory
        };
    }

    async update(id: number, changes: any){
        const category = await this.categoryRepository.findOne({ where: { id } });
        if(!category){
            return "Category not found";
        }
        this.categoryRepository.merge(category, changes);
        return this.categoryRepository.save(category);
    }

    async remove(id: number){
        const category = await this.categoryRepository.findOne({ where: { id } });
        if(!category){
            return "Category not found";
        }
        await this.categoryRepository.delete(id);
        return "Category deleted";
    }
}
