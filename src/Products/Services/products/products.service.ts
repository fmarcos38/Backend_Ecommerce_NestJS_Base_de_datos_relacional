import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/Products/Entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

    async findAll() {
        const products = await this.productRepository.find();
        if(products[0] == null) {
            return 'No hay usuarios';
        }
        return products;
    }

    async findOne(id: number) {
        const product = await this.productRepository.findOne({where: {id}});
        if(!product) {
            return 'No existe el producto';
        }
        return product;
    }

    async create(data: any) {
        const product = await this.productRepository.findOne({where: {name: data.name}});
        if(product) {
            return 'Ya existe el producto';
        }
        const newProduct = this.productRepository.create(data);
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
