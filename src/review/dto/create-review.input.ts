import { InputType, Field, Int  } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @Field(()=>String)
  @IsNotEmpty()
  therapistId : string ;

  @Field(()=>String)
  @IsNotEmpty()
  userId : string ; 
  
  @Field(()=>Int)
  @IsNotEmpty()
  rating : number ; 

  @Field(()=>String)
  @IsNotEmpty()
  comment : string ; 
}
