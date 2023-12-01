import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/Products/Entities/products.entity';
import { In, Repository } from 'typeorm';
import { BrandsService } from '../brands/brands.service';
import { CreateProductDto } from 'src/Products/Dtos/products.dto';
import { Category } from 'src/Products/Entities/categories.entity';
import { Brand } from 'src/Products/Entities/brands.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Brand) private brandRepository: Repository<Brand>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
    ) {}

    async findAll() {
        const products = await this.productRepository.find({ relations: ['brand', 'categories'] });
        if(products[0] == null) {
            return 'No hay usuarios';
        }
        return products;
    }

    async findOne(id: number) {
        const product = await this.productRepository.findOne({where: {id}, relations: ['brand'] });
        if(!product) {
            return 'No existe el producto';
        }
        return product;
    }

    async create(data: CreateProductDto) {
        const buscoProduct = await this.productRepository.find({ where: { name: data.name }, relations: ['brand'] });
        if (buscoProduct.length > 0) {
            return 'Ya existe el producto';
        }
        const newProduct = this.productRepository.create(data);

        //preguntar si viene la marca
        if (data.brandId) {
            const brand = await this.brandRepository.findOne({where: {id: data.brandId}});
            if (brand == null) {
                return 'No existe la marca';
            }
            newProduct.brand = brand;
        }

        //preguntar si vienen las categorias
        if(data.categoriesIds) {
            const categories = await this.categoryRepository.findByIds(data.categoriesIds);
            newProduct.categories = categories;
        }

        await this.productRepository.save(newProduct);
        return {
            message: 'Producto creado',
            newProduct
        };
    }

    async update(id: number, changes: any) {
        const product = await this.productRepository.findOne({where: {id}});
        if(!product) {
            return 'No existe el producto';
        }
        //pregunro si viene la marca
        if (changes.brandId) {
            const brand = await this.brandRepository.findOne({where: {id: changes.brandId}});
            if (brand == null) {
                return 'No existe la marca';
            }
            product.brand = brand
        }
        this.productRepository.merge(product, changes);
        return this.productRepository.save(product);
    }

    async remove(id: number) {
        const product = await this.productRepository.findOne({where: {id}});
        if(!product) {
            return 'No existe el producto';
        }
        await this.productRepository.delete(id);
        return 'Producto eliminado';
    }
}
