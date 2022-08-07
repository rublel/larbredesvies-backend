import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn() public id: number;
  @Column() public order_id: string;
  @Column() public customer_id: number;
  @Column() public product_id: number;
  @Column() public quantity: number;
  @Column() public total: number;
  @Column() public price: number;
  @Column() public line: number;
  @Column() public date: String;
  @Column() public status: string;
}
