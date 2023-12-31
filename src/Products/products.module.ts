import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./Entities/products.entity";
import { ProductController } from "./Controllers/product/product.controller";
import { ProductsService } from "./Services/products/products.service";
import { Brand } from "./Entities/brands.entity";
import { BrandsController } from "./Controllers/brands/brands.controller";
import { BrandsService } from "./Services/brands/brands.service";
import { Category } from "./Entities/categories.entity";
import { CategoryController } from "./Controllers/category/category.controller";
import { CategoriesService } from "./services/categories/categories.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product, Brand, Category])],
    controllers: [ ProductController, BrandsController,CategoryController ],
    providers: [ ProductsService, BrandsService, CategoriesService],
    exports: [ ProductsService, TypeOrmModule ], // Exportamos el servicio para poder usarlo en otros módulos, por ejem en el de USERS
})
export class ProductsModule {}
