import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Brand } from './brands.entity';
import { Category } from './categories.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'int' })
    price: number;

    @Column({ type: 'int' })
    stock: number;

    @Column({ type: 'varchar' })
    image: string;

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

    //relacion de productos a marcas
    //relacion N:1
    //un producto solo puede tener una marca pero una marca puede tener muchos productos
    //la referencia es en la tabla de productos, no hace falta el Join, ya sabe q la FK va a estar en esta tabla
    @ManyToOne(() => Brand, (brand) => brand.products) //muchos productoas pueden tener una marca
    brand: Brand;

    //relacion de productos a categorias
    //relacion N:M
    //un producto puede tener muchas categorias y una categoria puede tener muchos productos
    @ManyToMany(() => Category, (category) => category.products)
    @JoinTable() //se usa para definir la tabla intermedia NO importa en q entidad se ponga(PERO solo se pone en una)
    categories: Category[];
}