import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('increment') public id: number;
  @Column() public name: string;
  @Column({ nullable: true }) public siret: string;
  @Column({ nullable: true }) public tel: string;
  @Column() public email: string;
  @Column({ nullable: true }) public password: string;
  @Column({ nullable: true }) public address: string;
  @Column({ nullable: true }) public cp: string;
  @Column() public solde_init: string;
}
