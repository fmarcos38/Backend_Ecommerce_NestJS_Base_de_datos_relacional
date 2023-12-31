import {
    PrimaryGeneratedColumn,
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
} from 'typeorm';
import { Product } from './products.entity';


@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

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

    //para la relacion con productos
    //relacion muchos a muchos
    @ManyToMany(() => Product, (product) => product.categories)
    products: Product[];
}