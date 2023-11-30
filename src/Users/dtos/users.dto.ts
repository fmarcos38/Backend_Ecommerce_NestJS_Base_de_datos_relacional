import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateUserDto {
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty() //para swagger
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly role: string;

    //atributo para la relacion usuario -> cliente(si es q al momento de crear un usuario ESTA ligado a un cliente)
    /* @IsNumber()
    @IsPositive()
    @IsOptional()
    @ApiProperty()
    readonly customerId: number; */
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}