import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./Entities/products.entity";
import { ProductController } from "./Controllers/product/product.controller";
import { ProductsService } from "./Services/products/products.service";
import { Brand } from "./Entities/brands.entity";
import { BrandsController } from "./Controllers/brands/brands.controller";
import { BrandsService } from "./Services/brands/brands.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product, Brand])],
    controllers: [ ProductController, BrandsController ],
    providers: [ ProductsService, BrandsService],
    //exports: [ ProductsService ], // Exportamos el servicio para poder usarlo en otros módulos
})
export class ProductsModule {}
