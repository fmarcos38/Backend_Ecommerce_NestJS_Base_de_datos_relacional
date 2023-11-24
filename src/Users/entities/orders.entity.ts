import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Customers } from './customers.entity';
import { OrdersItems } from './order-items.entity';

@Entity()
export class Orders {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    //relaciones
    //relacion con Customers 1:N con Customers
    @ManyToOne(() => Customers, (customers) => customers.orders)
    customer: Customers;

    //relacion con OrdersItems 1:N con OrdersItems (una orden puede tener muchos items)
    @OneToMany(() => OrdersItems, (ordersItems) => ordersItems.order)
    items: OrdersItems[];

    //aca estoy haciendo q de acuerdo a la info q me manden, me devuelva la info de los productos q me interesa (osea estoy serializando la info q me mandan)

    //saco el total de la orden
}