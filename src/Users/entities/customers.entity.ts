
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Users } from './users.entity';
import { Orders } from './orders.entity';

@Entity()
export class Customers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    lastName: string;

    @Column({ type: 'varchar', length: 255 })
    phone: string;

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
    //relacion 1:1 con users
    //copn el 2do param hago referencia a la propiedad q cree en users.entity.ts(osea la column q tiene la FK)
    @OneToOne(() => Users, (user) => user.customer, { nullable: true }) //la relacion puede q sea nula por eso nuleable
    user: Users;

    //relacion 1:N con orders
    //un cliente puede tener muchas ordenes
    @OneToMany(() => Orders, (order) => order.customer)
    orders: Orders[];
}