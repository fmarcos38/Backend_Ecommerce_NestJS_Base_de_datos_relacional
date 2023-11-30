import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Customers } from './customers.entity';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string; // encript

    @Column({ type: 'varchar', length: 100 })
    role: string;

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
    //relacioon 1:1 con customers
    //copn el 2do param hago referencia a la propiedad q cree en customers.entity.ts 
    @OneToOne(() => Customers, (customer) => customer.user, { nullable: true }) //la relacion puede q sea nula por eso nuleable
    @JoinColumn() //nombre de la columna q se creará en la tabla users con la llave foranea. El join SOLO va en la tabla q cargará con la relacion
    customer: Customers;

}