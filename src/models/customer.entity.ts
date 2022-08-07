import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('customers')
//@Unique(['email'])
export class Customer {
  @PrimaryGeneratedColumn('increment') public id: number;
  @Column({ nullable: false }) public name: string;
  @Column({ nullable: true }) public contact: string;
  @Column({ nullable: true }) public siret: string;
  @Column({ nullable: true }) public tel: string;
  @Column({ unique: false, nullable: false }) public email: string;
  @Column({ nullable: true }) public password: string;
  @Column({ nullable: true }) public address: string;
  @Column({ nullable: true }) public cp: string;
  @Column() public solde_init: string;
  @Column() public solde_actuel: string;
  @Column({ nullable: false }) public date_creation: string;
}
