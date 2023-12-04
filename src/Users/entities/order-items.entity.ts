import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Orders } from './orders.entity';
import { Product } from 'src/Products/Entities/products.entity';

@Entity()
export class OrdersItems {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    readonly orderId: number;

    @Column({ type: 'int' })
    readonly productId: number;

    @Column({ type: 'int' })
    quantity: number;

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

    //relacon 1:N con productos
    //a traves de este atributo puedo acceder a la orden desde el producto
    //no realizo relacion BIDIRECCIONAL porque no necesito acceder a las ordenes desde los productos
    @ManyToOne(() => Product)
    product: Product;

    //relacion 1:N con orders
    //muchos items pueden pertenecer a una orden
    @ManyToOne(() => Orders, (order) => order.items)
    order: Orders;
}