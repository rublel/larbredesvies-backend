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
  @Column() public line: number = 1;
  @Column() public date: string = new Date().toISOString();
  @Column() public status: string = `PENDING`;
  @Column() public type: string = `DETAILED_ORDER`;

  constructor(partial: Partial<Transaction>) {
    Object.assign(this, partial);
  }
}
