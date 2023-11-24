import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Orders } from './orders.entity';

@Entity()
export class OrdersItems {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    //relaciones
    //relacion con products 1:N 

    
    //relacion con Orders 1:N con Orders
    @ManyToOne(() => Orders, (orders) => orders.items)
    order: Orders;
}