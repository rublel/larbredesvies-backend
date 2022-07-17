import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('increment') public id: number;
  @Column() public name: string;
  @Column() public reference: number;
  @Column() public category: string;
  @Column() public price: string;
}
