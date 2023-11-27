import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Customers } from './customers.entity';

@Entity()
export class Users {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true})
    name: string;

    @Column({ type: 'varchar', length: 100})
    password: string;

    @Column({type: 'varchar', length: 100})
    email: string;

}