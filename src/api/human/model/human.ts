import { Field, ID, ObjectType } from 'type-graphql';

import { Cat } from '@api/cat/model/cat';

@ObjectType()
export class Human {
  @Field(type => ID)
  id: number;

  @Field(type => String)
  firstName: string;

  @Field(type => String)
  lastName: string;

  @Field(type => [Cat], { nullable: true })
  cats?: Cat[];
}
