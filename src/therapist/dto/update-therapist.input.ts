import { CreateTherapistInput } from './create-therapist.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTherapistInput {
  @Field(()=>String)
  location : string ; 

  @Field(()=>Boolean)
  available : boolean ;
}
