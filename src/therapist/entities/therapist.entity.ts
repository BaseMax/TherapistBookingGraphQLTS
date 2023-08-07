import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Therapist {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
