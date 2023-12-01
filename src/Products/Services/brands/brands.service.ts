import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBrandDto, UpdateBrandDto } from 'src/Products/Dtos/brands.dto';
import { Brand } from 'src/Products/Entities/brands.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
    constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

    async findAll(){
        if(!(await this.brandRepo.find())){
            return "No brands found";
        }
        return this.brandRepo.find();
    }

    findOne(id: number) {
        const product = this.brandRepo.findOne({where: {id},
            relations: ['products'],
        });
        if (!product) {
            throw new NotFoundException(`Brand #${id} not found`);
        }
        return product;
    }

    async create(payload: CreateBrandDto){
        const newBrand = this.brandRepo.create(payload);
        return await this.brandRepo.save(newBrand);
    }

    async update(id: number, payload: UpdateBrandDto){
        const brand = await this.brandRepo.findOne({ where: { id } });
        if(!brand){
            return "Brand not found";
        }
        this.brandRepo.merge(brand, payload);
        return await this.brandRepo.save(brand);
    }

    async remove(id: number){
        const brand = await this.brandRepo.findOne({ where: { id } });
        if(!brand){
            return "Brand not found";
        }
        return await this.brandRepo.remove(brand);
    }
}
