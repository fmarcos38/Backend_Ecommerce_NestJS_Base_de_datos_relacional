import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/Products/Entities/products.entity';
import { Between, Filter, FindOptionsWhere, In, Repository } from 'typeorm';
import { BrandsService } from '../brands/brands.service';
import { CreateProductDto, FilterProductsDto } from 'src/Products/Dtos/products.dto';
import { Category } from 'src/Products/Entities/categories.entity';
import { Brand } from 'src/Products/Entities/brands.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Brand) private brandRepository: Repository<Brand>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
    ) {}

    //metodo para filtrar y paginar [params? = opcional]
    async findAll(params?: FilterProductsDto) {
        //si vienen parametros
        if(params) {
            const where: FindOptionsWhere<Product> = {}; //tipeo el where para q no me de error.
            const { limit, offset, minPrice, maxPrice } = params; 
            console.log("params:",params);

            //si viene el limit y el offset
            if(limit && offset){
                const paginado = await this.productRepository.findAndCount({
                    relations: ['brand', 'categories'],
                    take: limit,
                    skip: offset,
                    order: {
                        id: 'ASC'
                    }
                });
                return {
                    data: paginado[0],
                    count: paginado[1],
                };
                //return this.productRepository.find({ relations: ['brand', 'categories'], take: limit, skip: offset });
            }

            //si viene el minPrice y el maxPrice
            if(!minPrice) {
                return 'Debe ingresar el minPrice';
            }else if(!maxPrice) {
                return 'Debe ingresar el maxPrice';
            }else{
                return this.productRepository
                    .createQueryBuilder('product')
                    .where('product.price >= :minPrice', { minPrice })
                    .andWhere('product.price <= :maxPrice', { maxPrice })
                    .getMany();
            }
        }
        const products = await this.productRepository.find({ relations: ['brand', 'categories'], order: { id: 'ASC' } });//puedo o mostrar las relaciones
        if(products[0] == null) {
            return 'No hay usuarios';
        }

        return products;
    }

    async findOne(id: number) {
        const product = await this.productRepository.findOne({where: {id}, relations: ['brand', 'categories'] });
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
            const brand = await this.brandRepository.findOne({where: {id: data.brandId}}); //utilizo el metodo del REPOSITORY, y no el del service PORQ quiero q solo me traiga la marca
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
        //pregunto si vienen las categorias (me llega un array de ids)
        if(changes.categoriesIds) {
            const categories = await this.categoryRepository.findByIds(changes.categoriesIds);
            product.categories = categories;
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

    //--metodo elim categoria de un producto
    async removeCategoryOfProduct(productId: number, categoryId: number) {
        //busco producto
        const product = await this.productRepository.findOne({where: {id: productId}, relations: ['categories']});
        
        if(!product) {
            return 'No existe el producto';
        }
        //busco categoria
        const category = product.categories.find((item) => { return item.id === categoryId });
        console.log("Cat:",category);
        if(!category) {
            return 'No existe la categoria';
        }
        //elimino categoria del producto
        product.categories = product.categories.filter((item) => item.id !== category.id);

        //guardo cambios
        return this.productRepository.save(product);
    }

    //--agrego categoria a un producto
    async addCategoryToProduct(productId: number, categoryId: number) {
        //busco producto
        const product = await this.productRepository.findOne({where: {id: productId}, relations: ['categories']});
        if(!product) {  return 'No existe el producto'; }

        //busco la categoria en el producto
        const category = product.categories.find((item) => { return item.id === categoryId });
        if(category) {  return 'Ya existe la categoria'; }

        //busco la categoria
        const categoryAdd = await this.categoryRepository.findOne({where: {id: categoryId}});
        //agrego la categoria al producto
        product.categories.push(categoryAdd);

        //guardo cambios
        return this.productRepository.save(product);
    }


    
}
