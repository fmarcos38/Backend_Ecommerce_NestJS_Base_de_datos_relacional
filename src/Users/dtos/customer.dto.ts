import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty() //para swagger
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty() //para swagger
    readonly lastName: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    @ApiProperty() //para swagger
    readonly phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}