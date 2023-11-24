import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Customers } from './customers.entity';

@Entity()
export class Users {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true})
    username: string;

    @Column({ type: 'varchar', length: 100})
    password: string;

    @Column({ type: 'varchar', length: 100})
    role: string;

    @Column({type: 'varchar', length: 100})
    email: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;

    //relaciones
    //relacion 1:1 con Customers
    @OneToOne(() => Customers, (customers) => customers.user, { nullable: true }) // no todos los usuarios son clientes
    @JoinColumn({ name: 'customerId' }) //este decorador crea la referencia en la tabla de User y le digo q nombre va a tener la columna en la DB
    customer: Customers;
}