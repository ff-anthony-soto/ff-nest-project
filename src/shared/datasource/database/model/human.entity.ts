import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { CatHuman } from './cat-human.entity';

@Entity()
export class Human {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  firstName: string;

  @Column({ length: 500 })
  lastName: string;

  @OneToMany(type => CatHuman, catHuman => catHuman.human)
  catsHumans!: CatHuman[];
}
