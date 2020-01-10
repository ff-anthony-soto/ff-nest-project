import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';

import { Cat } from './cat.entity';
import { Human } from './human.entity';

@Entity()
export class CatHuman {
  @PrimaryColumn()
  catId: number;

  @PrimaryColumn()
  humanId: number;

  @ManyToOne(type => Cat, cat => cat.catsHumans)
  cat!: Cat;

  @ManyToOne(type => Human, category => category.catsHumans)
  human!: Human;
}
