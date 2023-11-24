
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Users } from './users.entity';
import { Orders } from './orders.entity';

@Entity()
export class Customers {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({type: 'varchar', length: 100})
    lastName: string;

    @Column({type: 'varchar', length: 100})
    phone: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    //relaciones
    //relacion 1:1 con Users
    @OneToOne(() => Users, (user) => user.customer, { nullable: true }) //mediante user.customer se accede a la propiedad customer de la entidad User
    user: Users;

    //relacion orden de compra
    @OneToMany(() => Orders, (orders) => orders.customer)
    orders: Orders[];
}