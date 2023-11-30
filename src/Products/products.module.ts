import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./Entities/products.entity";
import { ProductController } from "./Controllers/product/product.controller";
import { ProductsService } from "./Services/products/products.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ ProductController ],
    providers: [ ProductsService]
})
export class ProductsModule {}
