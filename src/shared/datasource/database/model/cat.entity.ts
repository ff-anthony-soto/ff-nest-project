import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

import { Breed } from './breed.entity';
import { CatHuman } from './cat-human.entity';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('int', { nullable: true })
  breedId?: number;

  @ManyToOne(() => Breed, breed => breed.cats, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'breedId' })
  breed?: Breed;

  @OneToMany(type => CatHuman, catHuman => catHuman.cat)
  catsHumans!: CatHuman[];
}
