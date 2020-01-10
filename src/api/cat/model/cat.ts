import { Field, ID, ObjectType } from 'type-graphql';

import { Human } from '@api/human/model/human';
import { Breed } from '@api/breed/model/breed';

@ObjectType()
export class Cat {
  @Field(type => ID)
  id: number;

  @Field(type => String)
  name: string;

  @Field(type => Number)
  breedId?: number;

  @Field(type => Breed, { nullable: true })
  breed?: Breed;

  @Field(type => Human, { nullable: true })
  owners?: Human[];
}
