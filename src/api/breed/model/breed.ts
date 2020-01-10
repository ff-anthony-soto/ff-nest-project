import { Field, ID, ObjectType } from 'type-graphql';

import { Cat } from '@api/cat/model/cat';

@ObjectType()
export class Breed {
  @Field(type => ID)
  id: number;

  @Field(type => String)
  name: string;

  @Field(type => Cat, { nullable: true })
  cats?: Cat[];
}
