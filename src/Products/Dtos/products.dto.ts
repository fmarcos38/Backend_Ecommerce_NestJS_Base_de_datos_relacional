import {
    IsString,
    IsNumber,
    IsUrl,
    IsNotEmpty,
    IsPositive,
    IsArray,
    IsOptional,
    Min,
    ValidateIf,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: `product's name` })
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    readonly price: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly stock: number;

    @IsUrl()
    @IsNotEmpty()
    @ApiProperty()
    readonly image: string;

    //para la relacion con marcas
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    readonly brandId: number;

    //para la relacion con categorias
    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    readonly categoriesIds: number[];
    
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

//dto para paginacion y filtrado
export class FilterProductsDto {
    @IsOptional()
    @IsPositive()
    limit: number; //cuantos productos quiero

    @IsOptional()
    @Min(0)
    offset: number; //desde donde empieza

    @IsOptional()
    @IsPositive()
    @ValidateIf((item) => item.maxPrice) //valido que si viene el maxPrice, tamb el minPrice
    minPrice: number; //filtro por precio minimo

    @IsOptional()
    @IsPositive()
    @ValidateIf((item) => item.minPrice) //valido que si viene el minPrice, tamb el maxPrice
    maxPrice: number; //filtro por precio maximo
}