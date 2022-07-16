import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryColumn() public name: string;
  @PrimaryColumn() public reference: number;
  @PrimaryColumn() public category: string;
  @Column() public price: string;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
