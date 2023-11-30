import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty() 
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty() 
    readonly lastName: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    @ApiProperty() 
    readonly phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}