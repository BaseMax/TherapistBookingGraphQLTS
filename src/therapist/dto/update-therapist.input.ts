import { CreateTherapistInput } from './create-therapist.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTherapistInput extends PartialType(CreateTherapistInput) {
  @Field(() => Int)
  id: number;
}
