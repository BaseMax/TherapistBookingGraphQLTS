import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateTherapistInput {
  @Field(()=>String)
  userId : string ; 

  @Field(()=>String)
  firstName : string ; 

  @Field(()=>String)
  location : string ; 

  @Field(()=>Boolean)
  available : boolean ;

  @Field(()=>String)
  specialty : string ;
}
