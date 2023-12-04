import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Customers } from './customers.entity';
import { OrdersItems } from './order-items.entity';

@Entity()
export class Orders {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updateAt: Date;

    //atributo para la relacion
    //una orden pertenece a un cliente
    @ManyToOne(() => Customers, (customer) => customer.orders) 
    customer: Customers;

    //relacion 1:N con order-items
    //una orden puede tener muchos items
    @OneToMany(() => OrdersItems, (orderItem) => orderItem.order)
    items: OrdersItems[];
}