import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateOrderDto  {
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    customer: number; //id del customer

    /* @ApiProperty({ type: [OrderItemDto] })
    items: OrderItemDto[]; */ //array de items
}

export class UpdateOrderDto extends CreateOrderDto {}