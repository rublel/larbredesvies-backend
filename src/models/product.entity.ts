import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('increment') public id: number;
  @Column() public name: string;
  @Column() public reference: number;
  @Column() public category: keyof Category;
  @Column() public price: string;
}
