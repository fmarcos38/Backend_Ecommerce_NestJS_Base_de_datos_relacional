import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Orders } from './orders.entity';

@Entity()
export class OrdersItems {

    @PrimaryGeneratedColumn()
    id: number;
}