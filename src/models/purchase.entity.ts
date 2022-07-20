import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn() public id: number;
  @Column() public order_id: string;
  @Column() public customer_id: number;
  @Column() public product_id: number;
  @Column() public quantity: number;
  @Column() public price: number;
  @Column({ nullable: true }) public line: number;
  @Column() public date: String;
}
