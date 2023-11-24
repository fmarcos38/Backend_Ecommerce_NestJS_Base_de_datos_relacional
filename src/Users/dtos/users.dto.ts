import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateUserDto {

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly role: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string;

    //atributo para la relacion 1:1 con Customers (si es q al momento de crear un usuario ESTA ligado a un cliente)
    @IsNumber()
    @IsOptional()
    @IsPositive()
    @ApiProperty()
    readonly customerId: number;
}