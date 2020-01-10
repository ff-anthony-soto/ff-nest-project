import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Cat } from './cat.entity';

@Entity()
export class Breed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @OneToMany(() => Cat, cat => cat.breed, {
    cascade: ['insert', 'update'],
  })
  cats: Cat[];
}
