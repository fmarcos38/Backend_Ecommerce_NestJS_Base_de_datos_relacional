import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Customers } from './customers.entity';
import { OrdersItems } from './order-items.entity';

@Entity()
export class Orders {

    @PrimaryGeneratedColumn()
    id: number;
}