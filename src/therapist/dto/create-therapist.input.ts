import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTherapistInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
