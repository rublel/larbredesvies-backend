import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('categories')
//@Unique(['email'])
export class Category {
  @PrimaryGeneratedColumn('increment') public id: number;
  @Column({ nullable: false, unique: true }) public name: string;
}
