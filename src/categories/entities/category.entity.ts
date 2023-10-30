import { Product } from 'src/products/entities/product.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  product: Product[];
}
