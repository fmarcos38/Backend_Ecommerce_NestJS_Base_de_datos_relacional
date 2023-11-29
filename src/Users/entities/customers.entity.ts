
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
}